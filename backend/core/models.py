import uuid

from django.db import models


class Order(models.Model):
    class Status(models.TextChoices):
        OK = "ok"
        FORMED = "formed"

    order_key = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Код заказа",
    )
    items = models.ManyToManyField(
        'Item', related_name='order_items', verbose_name="Товары"
    )
    packages = models.ManyToManyField(
        'Package', related_name='order_packages', verbose_name="Упаковки"
    )
    status = models.CharField(
        max_length=50, choices=Status.choices, verbose_name="Статус"
    )

    def __str__(self):
        return str(self.order_key)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class Item(models.Model):
    sku = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Артикул",
    )
    count = models.IntegerField(verbose_name="Количество товара на складе")
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
        'Cargotype', related_name='item_types', verbose_name="Типы грузов"
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
        verbose_name = "Тип груза"
        verbose_name_plural = "Типы грузов"


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
    display_rf_pack = models.BooleanField(verbose_name="Отображать RF пакет")
    price = models.IntegerField(verbose_name="Цена")
    orders = models.ManyToManyField(
        Order, related_name='package_orders', verbose_name="Заказы"
    )

    def __str__(self):
        return self.carton_type

    class Meta:
        verbose_name = "Упаковка"
        verbose_name_plural = "Упаковки"
