from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .serializers import BoardSerializer, BoardListSerializer, CardSerializer

from .models import Board, BoardList, Card

# Board
# viewset basically gives that particular function all the different http methods
class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class BoardListViewSet(viewsets.ModelViewSet):
    queryset = BoardList.objects.all()
    serializer_class = BoardListSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer



















# Create your views here.
# @api_view(["GET"])
# def apiOverview(request):
#     api_urls = {
#         # Boards
#         "List/Create Boards": "/api/boards/",
#         "Retrieve/Update/Delete Board": "/api/boards/<int:pk>/",

#         # Lists
#         "List/Create Lists": "/api/lists/",
#         "Retrieve/Update/Delete List": "/api/lists/<int:pk>/",

#         # Cards
#         "List/Create Cards": "/api/cards/",
#         "Retrieve/Update/Delete Card": "/api/cards/<int:pk>/",
#     }

#     return Response(api_urls)

# def get_all(model, serializer_class):
#     queryset = model.objects.all()
#     serializer = serializer_class(queryset, many=True)
#     return Response(serializer.data)

# @api_view(["GET"])
# def get_boards(request):
#     return get_all(Board, BoardSerializer)


# @api_view(["GET"])
# def get_lists(request):
#     return get_all(BoardList, BoardListSerializer)


# @api_view(["GET"])
# def get_cards(request):
#     return get_all(Card, CardSerializer)
