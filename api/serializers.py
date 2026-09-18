from rest_framework import serializers
from .models import Board, BoardList, Card

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'

class BoardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardList
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'