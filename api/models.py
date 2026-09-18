from django.db import models

# Create your models here.
class Board(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title}"

class BoardList(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="lists")
    title = models.CharField(max_length=100)

    def __str__(self):
        return f"List: {self.title}"

class Card(models.Model):
    board_list = models.ForeignKey(BoardList, on_delete=models.CASCADE, related_name="cards")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"Card: {self.title}"
