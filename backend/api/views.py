import random

from django.views.decorators.http import require_GET
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer


@require_GET
def generate_order_id(request):
    orders = Order.objects.all()
    if orders:
        order = random.choice(orders)
        order.status = Order.Status.IN_PROGRESS.value
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    else:
        return Response({'message': 'No orders found.'}, status=404)
