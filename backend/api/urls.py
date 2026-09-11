from django.urls import path

from . import views

urlpatterns = [
    path("contact/", views.ContactView.as_view(), name="contact"),
    path("newsletter/", views.NewsletterSubscribeView.as_view(), name="newsletter"),
]