import random
from collections import Counter

import requests
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from DS.main_for_catboost_new import predict
from orders.models import Order

from .serializers import (
    OrderPackResponseSerializer,
    OrderSerializer,
    OrderToPackSerializer,
)


class GenerateOrderKey(APIView):
    def get(self, request):
        orders = Order.objects.filter(
            status__in=[Order.Status.FORMED.value, Order.Status.FAIL.value]
        )
        if orders:
            order = random.choice(orders)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response(
                {'message': 'Заказ не найден.'},
                status=status.HTTP_404_NOT_FOUND,
            )


class CanceledOrder(APIView):
    def patch(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        print(order)
        order.status = Order.Status.CANCELED.value
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class MarkOrderAsOK(APIView):
    def patch(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        order.status = Order.Status.OK.value
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderToPack(APIView):
    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        serializer = OrderToPackSerializer(order)
        return Response(serializer.data)


class OrderPack(APIView):
    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        url = f'http://localhost:8000/api/orders/{order_number}/order_to_pack/'
        response = requests.get(url)
        data = response.json()
        packages = predict(data)
        recomended_pack = packages['recomended_packs'][0]
        counter = Counter(recomended_pack)
        recomended_pack = [{key: value for key, value in counter.items()}]
        serializer = OrderPackResponseSerializer(order)
        response_data = serializer.data
        response_data['packages'] = recomended_pack
        # response_data['packages'] = packages

        return Response(response_data)
