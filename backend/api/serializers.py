from django.db.models import F
from rest_framework import serializers

from orders.models import Order, OrderItem,  Item


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['status', 'order_number']


class OrderItemSerializer(serializers.ModelSerializer):
    size1 = serializers.SerializerMethodField()
    size2 = serializers.SerializerMethodField()
    size3 = serializers.SerializerMethodField()
    weight = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['sku', 'count', 'size1', 'size2', 'size3', 'weight', 'type']
    
    def get_size1(self, obj):
        return obj.sku.a
    
    def get_size2(self, obj):
        return obj.sku.b
    
    def get_size3(self, obj):
        return obj.sku.c
    
    def get_weight(self, obj):
        return obj.sku.weight

    def get_type(self, obj):
        return obj.sku.types.values_list('cargotype', flat=True)


class OrderToPackSerializer(serializers.ModelSerializer):
    orderId = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['orderId', 'items']

    def get_orderId(self, obj):
        return obj.order_key
    
    def get_items(self, obj):
        order_items = obj.orderitem_set.select_related('sku').all()
        order_item_serializer = OrderItemSerializer(order_items, many=True)
        return order_item_serializer.data


class OrderPackSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    # items_count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['order_number', 'delivery_type', 'status', 'items']

    def get_items(self, obj):
        return obj.items.values(
            'image_url', 'name', 'barcode',
        )

    # def get_items_count(self, obj):
    #     return obj.orderitem_set.values('sku','count')
