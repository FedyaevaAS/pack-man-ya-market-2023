from rest_framework import serializers

from orders.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status', 'order_number']


class OrderToPackItemSerializer(serializers.ModelSerializer):
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
        order_item_serializer = OrderToPackItemSerializer(
            order_items, many=True
        )
        return order_item_serializer.data


class OrderItemSerializer(OrderToPackItemSerializer):
    image_url = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    barcode = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()

    class Meta(OrderToPackItemSerializer.Meta):
        fields = ['count', 'image_url', 'name', 'barcode', 'tags']

    def get_image_url(self, obj):
        return obj.sku.image_url

    def get_name(self, obj):
        return obj.sku.name

    def get_barcode(self, obj):
        return obj.sku.barcode

    def get_tags(self, obj):
        tags = obj.sku.types.values_list('tag__name', flat=True)
        return [tag for tag in set(tags) if tag]


class OrderPackResponseSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['order_number', 'delivery_type', 'count', 'status', 'items']

    def get_items(self, obj):
        order_items = obj.orderitem_set.select_related('sku').all()
        order_item_serializer = OrderItemSerializer(order_items, many=True)
        return order_item_serializer.data

    def get_count(self, obj):
        return sum(
            obj.orderitem_set.select_related('sku')
            .all()
            .values_list('count', flat=True)
        )
