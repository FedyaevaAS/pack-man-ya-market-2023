import random

import requests
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from DS.main_for_catboost_new import predict
from orders.models import Order

from .serializers import OrderSerializer, OrderToPackSerializer


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


# class OrderPack(APIView):
#     def get(self, request, order_number):
#         url = f'http://localhost:8000/api/orders/{order_number}/order_to_pack/'
#         response = requests.get(url)
#         data = response.json()
#         packages = predict(data)
#         print(packages)
#         return Response({'message': 'Success'})


class OrderPack(APIView):
    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        url = f'http://localhost:8000/api/orders/{order_number}/order_to_pack/'
        response = requests.get(url)
        data = response.json()
        packages = predict(data)
        recomended_packs = packages['recomended_packs'][0]
        response_data = {
            "order_key": str(order.order_key),
            "delivery_type": order.delivery_type,
            "count": order.items.count(),
            "status": order.status,
            "packages": packages['recomended_packs'][0],
            "items": [],
        }
        for item in order.items.all():
            item_data = {
                "image": item.image_url,
                "name": item.name,
                "count": order.items.filter(sku=item.sku).count(),
                "tags": list(item.types.values_list('cargotype', flat=True)),
                "barcode": item.barcode,
            }
            response_data["items"].append(item_data)

        if not recomended_packs:
            return Response(
                {'message': 'Нет рекомендованных упаковок'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(response_data)
