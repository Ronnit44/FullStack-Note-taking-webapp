from django.db import models

from django.contrib.auth.models import User


class Note(models.Model):
    # CATEGORY_CHOICES = [
    #     ('personal', 'Personal'),
    #     ('educational', 'Educational'),
    #     ('daily_todo', 'Daily To Do'),
    #     ('grocery', 'Grocery'),
    # ]

    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
