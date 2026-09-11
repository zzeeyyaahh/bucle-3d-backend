from rest_framework import serializers

from .models import ContactSubmission, NewsletterSubscriber


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "phone", "company", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]

    def validate_name(self, value):
        return value.strip()

    def validate_phone(self, value):
        return value.strip()


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]

    def validate_email(self, value):
        return value.strip().lower()