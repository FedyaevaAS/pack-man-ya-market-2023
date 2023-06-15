import random

from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from orders.models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    @api_view(['GET'])
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

    @api_view(['GET'])
    def get_by_order_id(request, order_id):
        order = get_object_or_404(Order, order_key=order_id)
        items = order.items.all()

        result = []
        for item in items:
            item_data = {
                'image': item.image,
                'name': item.name,
                'count': item.count,
                'type': item.types,
                'barcode': item.barcode,
            }
            result.append(item_data)

        return Response(result)
