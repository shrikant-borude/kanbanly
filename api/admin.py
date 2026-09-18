from django.contrib import admin

from .models import Board, BoardList, Card
# Register your models here.

admin.site.register(Board)
admin.site.register(BoardList)
admin.site.register(Card)
