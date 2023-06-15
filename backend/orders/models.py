import uuid

from django.db import models
from django_enum.fields import EnumField


class Order(models.Model):
    class Status(models.TextChoices):
        OK = "ok"
        FORMED = "formed"
        FAIL = "fail"
        CANCEL = "cancel"
        IN_PROGRESS = "in_progress"

    order_key = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Id заказа",
    )
    status = EnumField(Status, max_length=50, verbose_name="Статус")
    items = models.ManyToManyField(
        "Item", verbose_name="Товары", through="OrderItem"
    )
    packages = models.ManyToManyField(
        "Package", verbose_name="Упаковки", through="OrderPackage"
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
        verbose_name="Id товара",
    )
    name = models.CharField(max_length=50, verbose_name="Название товара")
    barcode = models.CharField(max_length=50, verbose_name="Штрихкод")
    image = models.ImageField(
        upload_to="item_images/", verbose_name="Картинка"
    )
    a = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Длина"
    )
    b = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Ширина"
    )
    c = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Высота"
    )
    weight = models.DecimalField(
        max_digits=10, decimal_places=3, verbose_name="Вес"
    )
    types = models.ManyToManyField(
        "Cargotype", verbose_name="Карготипы", through="ItemCargotypes"
    )

    def __str__(self):
        return str(self.sku)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class Cargotype(models.Model):
    cargotype = models.IntegerField(primary_key=True, verbose_name="Тип груза")
    description = models.CharField(max_length=150, verbose_name="Описание")

    def __str__(self):
        return self.cargotype

    class Meta:
        verbose_name = "Карготип"
        verbose_name_plural = "Карготипы"


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

    def __str__(self):
        return self.carton_type

    class Meta:
        verbose_name = "Упаковка"
        verbose_name_plural = "Упаковки"


class ItemCargotypes(models.Model):
    sku = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.ForeignKey(Cargotype, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Карготип товара'
        verbose_name_plural = 'Карготипы товаров'

    def __str__(self):
        return f'{self.sku} {self.type}'


class OrderPackage(models.Model):
    order_key = models.ForeignKey(Order, on_delete=models.CASCADE)
    cartontype = models.ForeignKey(Package, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Упаковка заказа'
        verbose_name_plural = 'Упаковки заказов'

    def __str__(self):
        return f'{self.order_key} {self.cartontype}'


class OrderItem(models.Model):
    order_key = models.ForeignKey(Order, on_delete=models.CASCADE)
    sku = models.ForeignKey(Item, on_delete=models.CASCADE)
    count = models.IntegerField(verbose_name="Количество")

    class Meta:
        verbose_name = 'Товар заказа'
        verbose_name_plural = 'Товары заказов'

    def __str__(self):
        return f'{self.order_key} {self.sku}'
