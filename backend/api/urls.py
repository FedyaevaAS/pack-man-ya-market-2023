from django.urls import path

from .views import CancelOrder, GenerateOrderID, GetByOrderId, MarkOrderAsOK

urlpatterns = [
    path(
        'generate_order_id/',
        GenerateOrderID.as_view(),
        name='generate_order_id',
    ),
    path(
        'cancel_order/<uuid:order_key>/',
        CancelOrder.as_view(),
        name='cancel_order',
    ),
    path(
        'mark_order_as_ok/<uuid:order_key>/',
        MarkOrderAsOK.as_view(),
        name='mark_order_as_ok',
    ),
    path(
        'get_by_order_id/<uuid:order_key>/',
        GetByOrderId.as_view(),
        name='get_by_order_id',
    ),
]
