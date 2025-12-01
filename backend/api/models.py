from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    # Color choices for note tags
    COLOR_CHOICES = [
        ('default', 'Default'),
        ('red', 'Red'),
        ('orange', 'Orange'),
        ('yellow', 'Yellow'),
        ('green', 'Green'),
        ('blue', 'Blue'),
        ('purple', 'Purple'),
    ]

    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    
    # New fields for enhancements
    is_pinned = models.BooleanField(default=False)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='default')

    class Meta:
        ordering = ['-is_pinned', '-created_at']  # Pinned first, then newest

    def __str__(self):
        return self.title
