from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Search about viewset
from .views import BoardViewSet, BoardListViewSet, CardViewSet

router = DefaultRouter()
router.register(r'boards', BoardViewSet)
router.register(r'lists', BoardListViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]