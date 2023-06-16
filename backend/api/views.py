import random

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Order

from .serializers import OrderSerializer


class GenerateOrderKey(APIView):
    def get(self, request):
        orders = Order.objects.filter(
            status__in=[Order.Status.FORMED.value, Order.Status.FAIL.value]
        )
        if orders:
            order = random.choice(orders)
            data = {'status': order.status, 'order_number': order.order_number}
            return Response(data)
        else:
            return Response(
                {'message': 'Заказ не найден.'},
                status=status.HTTP_404_NOT_FOUND,
            )


class CanceledOrder(APIView):
    def patch(self, request, order_key):
        order = get_object_or_404(Order, order_key=order_key)
        order.status = Order.Status.CANCELED.value
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class MarkOrderAsOK(APIView):
    def patch(self, request, order_key):
        order = get_object_or_404(Order, order_key=order_key)
        order.status = Order.Status.OK.value
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderPack(APIView):
    def get(self, request, order_key):
        order = get_object_or_404(Order, order_key=order_key)
        order.status = Order.Status.IN_PROGRESS.value
        order.save()

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
