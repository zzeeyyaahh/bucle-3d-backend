from django.contrib import admin

from .models import ContactSubmission, NewsletterSubscriber


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "company", "submitted_at")
    list_filter = ("submitted_at",)
    search_fields = ("name", "email", "company", "phone")
    readonly_fields = ("id", "submitted_at")
    date_hierarchy = "submitted_at"


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at")
    search_fields = ("email",)
    readonly_fields = ("id", "subscribed_at")
    date_hierarchy = "subscribed_at"
    list_per_page = 100