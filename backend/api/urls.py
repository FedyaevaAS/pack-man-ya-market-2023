from django.urls import path

from .views import CanceledOrder, GenerateOrderKey, MarkOrderAsOK, OrderPack

urlpatterns = [
    path(
        'generate_order_key/',
        GenerateOrderKey.as_view(),
        name='generate_order_id',
    ),
    path(
        '<uuid:order_key>/canceled',
        CanceledOrder.as_view(),
        name='canceled_order',
    ),
    path(
        '<uuid:order_key>/ok',
        MarkOrderAsOK.as_view(),
        name='mark_order_as_ok',
    ),
    path(
        '<uuid:order_key>/pack',
        OrderPack.as_view(),
        name='get_by_order_id',
    ),
]
