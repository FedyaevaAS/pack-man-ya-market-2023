import csv
import os

from django.core.management.base import BaseCommand

from orders.models import (Cargotype, Item, ItemCargotypes, Order, OrderItem, Tag,
                           Package)
from packman.settings import BASE_DIR


class Command(BaseCommand):
    """Записывает в базу данных sqlite из csv-файлов."""

    help = 'Writes to sqlite project_database from csv files.'

    def handle(self, *args, **options):
        CSV_TO_SQL = {
            'carton.csv': Package,
            'order.csv': Order,
            'item.csv': Item,
            'tag.csv': Tag,
        }
        data_location = os.path.join(BASE_DIR, "project_data")
        for name in CSV_TO_SQL:
            location_csv = os.path.join(data_location, name)
            with open(location_csv) as csv_file:
                csv_reader = csv.DictReader(csv_file)
                model = CSV_TO_SQL[name]
                for row in csv_reader:
                    model.objects.get_or_create(**row)
            print(f'{name} loaded')

        csv_name = "cargotype.csv"
        location_csv = os.path.join(data_location, csv_name)
        with open(location_csv, encoding="utf8") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                tag_id = row['tag_id']
                if tag_id == '':
                    Cargotype.objects.get_or_create(
                        cargotype=row['cargotype'],
                        description=row['description']
                    )
                else:
                    tag = Tag.objects.get(id=tag_id)
                    Cargotype.objects.get_or_create(
                        cargotype=row['cargotype'],
                        description=row['description'],
                        tag=tag
                    )

        print(f'{csv_name} loaded')

        csv_name = "order_item.csv"
        location_csv = os.path.join(data_location, csv_name)
        with open(location_csv) as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                order_key = row['order_key']
                sku = row['sku']
                order = Order.objects.get(order_key=order_key)
                item = Item.objects.get(sku=sku)
                OrderItem.objects.get_or_create(
                    order_key=order,
                    sku=item,
                    count=row['count']
                )
        print(f'{csv_name} loaded')

        csv_name = "sku_cargotype.csv"
        location_csv = os.path.join(data_location, csv_name)
        with open(location_csv) as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                cargotype = row['type']
                sku = row['sku']
                type = Cargotype.objects.get(cargotype=cargotype)
                item = Item.objects.get(sku=sku)
                ItemCargotypes.objects.get_or_create(
                    sku=item,
                    type=type
                )
        print(f'{csv_name} loaded')
