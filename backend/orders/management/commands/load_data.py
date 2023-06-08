import os
import csv

from django.core.management.base import BaseCommand
    
from orders.models import Cargotype, Package, Order, Item, ItemCargotypes
from packman.settings import BASE_DIR


class Command(BaseCommand):
    """Записывает в базу данных sqlite из csv-файлов."""

    help = 'Writes to sqlite project_database from csv files.'

    def handle(self, *args, **options):
        # Соответствие имён файлов csv названиям таблиц БД
        # Conformity csv-file names to project_database table names
        CSV_TO_SQL = {
            'cargotype.csv': Cargotype,
            'carton.csv': Package,
            'order.csv': Order,

            'item.csv': (
                Item, {Order: 'order_key'}
            )
            # 'sku_cargotype.csv': ItemCargotypes,

            # 'genre_title.csv': models.Genre_title,
            # 'review.csv': models.Review,
        }

        for name in CSV_TO_SQL:
            print(name, end=' ')
            location_csv = os.path.join(BASE_DIR, "project_data", name)
            with open(location_csv) as csv_file:
                csv_reader = csv.DictReader(csv_file)
                model = CSV_TO_SQL[name]
                for row in csv_reader:
                    model.objects.get_or_create(**row)
            print(' -- filled')

        # location_csv = os.path.join(BASE_DIR, "project_data")

        # print('titles.csv', end=' ')
        # with open(location_csv + 'titles.csv', 'r',
        #           encoding='utf-8') as csv_file:
        #     csv_reader = csv.DictReader(csv_file)
        #     base = models.Title
        #     for row in csv_reader:
        #         category_id = row['category']
        #         category = models.Category.objects.get(id=category_id)
        #         base.objects.get_or_create(
        #             id=row['id'],
        #             name=row['name'],
        #             year=row['year'],
        #             category=category,
        #         )
        # print(' -- filled')

        # print('genre_title.csv', end=' ')
        # with open(location_csv + 'genre_title.csv', 'r',
        #           encoding='utf-8') as csv_file:
        #     csv_reader = csv.DictReader(csv_file)
        #     base = models.GenreTitle
        #     for row in csv_reader:
        #         title_id = row['title_id']
        #         title = models.Title.objects.get(id=title_id)
        #         genre_id = row['genre_id']
        #         genre = models.Genre.objects.get(id=genre_id)
        #         base.objects.get_or_create(
        #             id=row['id'],
        #             title_id=title,
        #             genre_id=genre,
        #         )
        # print(' -- filled')

        # print('review.csv', end=' ')
        # with open(location_csv + 'review.csv', 'r',
        #           encoding='utf-8') as csv_file:
        #     csv_reader = csv.DictReader(csv_file)
        #     base = models.Review
        #     for row in csv_reader:
        #         author_id = row['author']
        #         author = models.User.objects.get(id=author_id)
        #         title_id = row['title_id']
        #         title = models.Title.objects.get(id=title_id)
        #         base.objects.get_or_create(
        #             id=row['id'],
        #             title=title,
        #             text=row['text'],
        #             author=author,
        #             score=row['score'],
        #             pub_date=row['pub_date'],
        #         )
        # print(' -- filled')

        # print('comments.csv', end=' ')
        # with open(location_csv + 'comments.csv', 'r',
        #           encoding='utf-8') as csv_file:
        #     csv_reader = csv.DictReader(csv_file)
        #     base = models.Comment
        #     for row in csv_reader:
        #         author_id = row['author']
        #         author = models.User.objects.get(id=author_id)
        #         review_id = row['review_id']
        #         review = models.Review.objects.get(id=review_id)
        #         base.objects.get_or_create(
        #             id=row['id'],
        #             review=review,
        #             text=row['text'],
        #             author=author,
        #             pub_date=row['pub_date'],
        #         )
        # print(' -- filled')