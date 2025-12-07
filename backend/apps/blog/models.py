from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User=get_user_model()

class Blog(models.Model):
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name="blogs",null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    content_html = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)
    is_approved = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.blog.title}"

class Like(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    is_like = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("blog", "user")

    def __str__(self):
        return f"{self.user} - {self.blog.title} - {'Like' if self.is_like else 'Unlike'}"
