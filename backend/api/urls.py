from django.urls import path

from .views import (CanceledOrder, GenerateOrderKey, MarkOrderAsOK, OrderPack,
                    OrderToPack)

urlpatterns = [
    path(
        'generate_order_key/',
        GenerateOrderKey.as_view(),
        name='generate_order_id',
    ),
    path(
        '<int:order_number>/cancel/',
        CanceledOrder.as_view(),
        name='cancel_order',
    ),
    path(
        '<int:order_number>/ok/',
        MarkOrderAsOK.as_view(),
        name='mark_order_as_ok',
    ),
    path(
        '<int:order_number>/pack/',
        OrderPack.as_view(),
        name='get_by_order_id',
    ),
    path(
        '<int:order_number>/order_to_pack/',
        OrderToPack.as_view(),
    ),
]
