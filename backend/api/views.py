import random
from collections import Counter

from django.shortcuts import get_object_or_404
from DS.main_for_catboost_new import predict
from orders.models import Order, OrderPackage, Package
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (OrderPackResponseSerializer, OrderSerializer,
                          OrderToPackSerializer)


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
        ordertopack_serializer = OrderToPackSerializer(order)
        packages = predict(ordertopack_serializer.data)
        recomended_pack = packages['recomended_packs'][0]
        counter = Counter(recomended_pack)
        recomended_pack = [{key: value for key, value in counter.items()}]
        serializer = OrderPackResponseSerializer(order)
        response_data = serializer.data
        response_data['packages'] = recomended_pack
        return Response(response_data)
