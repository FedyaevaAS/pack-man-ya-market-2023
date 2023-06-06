from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import generate_order_id

router = DefaultRouter()
router.register('generate_order_id', generate_order_id)

urlpatterns = [
    path('', include(router.urls)),
]
