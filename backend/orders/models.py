import uuid

from django.db import models
from django_enum import Enum, EnumField


class Order(models.Model):
    class Status(Enum):
        OK = "ok"
        FORMED = "formed"
        FAIL = "fail"
        IN_PROGRESS = 'in progress'

    order_key = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Id заказа",
    )
    items = models.ManyToManyField(
        'Item', related_name='order_items', verbose_name="Товары"
    )
    packages = models.ManyToManyField(
        'Package', related_name='order_packages', verbose_name="Упаковки"
    )
    status = EnumField(Status, max_length=50, verbose_name="Статус")

    def __str__(self):
        return str(self.order_key)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class Item(models.Model):
    name = models.CharField(max_length=50, verbose_name='название товара')
    barcode = models.CharField(max_length=50, verbose_name='штрихкод')
    image = models.ImageField(
        upload_to='item_images/', verbose_name='картинка'
    )
    sku = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Id товара",
    )
    count = models.IntegerField(verbose_name="Количество")
    length = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Длина"
    )
    width = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Ширина"
    )
    height = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Высота"
    )
    weight = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Вес"
    )
    types = models.ManyToManyField(
        'Cargotype', related_name='item_types', verbose_name="карготипы"
    )

    def __str__(self):
        return str(self.sku)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class Cargotype(models.Model):
    cargotype = models.CharField(
        primary_key=True, max_length=50, verbose_name="Тип груза"
    )
    description = models.CharField(max_length=150, verbose_name="Описание")
    items = models.ManyToManyField(
        Item, related_name='cargo_items', verbose_name="Товары"
    )

    def __str__(self):
        return self.cargotype

    class Meta:
        verbose_name = "карготип товара"
        verbose_name_plural = "карготипы товаров"


class Package(models.Model):
    carton_type = models.CharField(
        primary_key=True, max_length=50, verbose_name="Тип упаковки"
    )
    length = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Длина"
    )
    width = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Ширина"
    )
    height = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Высота"
    )
    display_rf_pack = models.BooleanField(verbose_name="Доступно на складе")
    price = models.IntegerField(verbose_name="Цена")
    orders = models.ManyToManyField(
        Order, related_name='package_orders', verbose_name="Заказы"
    )

    def __str__(self):
        return self.carton_type

    class Meta:
        verbose_name = "Упаковка"
        verbose_name_plural = "Упаковки"
