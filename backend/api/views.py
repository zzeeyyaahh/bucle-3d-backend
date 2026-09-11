from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import NewsletterSubscriber
from .serializers import ContactSubmissionSerializer, NewsletterSubscriberSerializer


class ContactView(APIView):
    """Public endpoint for the contact form. Returns 201 on success."""

    serializer_class = ContactSubmissionSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        self._notify(submission)

        return Response(
            {
                "message": "Message received. We'll get back to you soon.",
                "id": submission.id,
            },
            status=status.HTTP_201_CREATED,
        )

    @staticmethod
    def _notify(submission):
        recipients = settings.CONTACT_NOTIFY_RECIPIENTS
        if not recipients:
            return
        send_mail(
            subject=f"New contact from {submission.name}",
            message=(
                f"Name: {submission.name}\n"
                f"Email: {submission.email}\n"
                f"Phone: {submission.phone or '-'}\n"
                f"Company: {submission.company or '-'}\n"
                f"\n{'-' * 40}\n{submission.message or '(no message)'}\n"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipients,
            fail_silently=True,
        )


class NewsletterSubscribeView(APIView):
    """Public endpoint for the newsletter form. Idempotent per email."""

    serializer_class = NewsletterSubscriberSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        _, created = NewsletterSubscriber.objects.get_or_create(email=email)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK

        response_data = {
            "message": "You're on the list." if created else "You're already subscribed.",
            "subscribed": True,
        }

        if created:
            self._send_welcome_email(email)

        return Response(response_data, status=status_code)

    @staticmethod
    def _send_welcome_email(email):
        send_mail(
            subject="Welcome to the Bucle dispatch",
            message=(
                "Thanks for subscribing. You'll hear from us when there's "
                "something worth sharing.\n\n— Bucle"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
        )