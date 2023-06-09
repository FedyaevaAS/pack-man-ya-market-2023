import os
import math

import pandas as pd

from packman.settings import BASE_DIR

carton_data_location = os.path.join(BASE_DIR, "project_data", "carton_data.csv")
carton_data = pd.read_csv(carton_data_location)

# функция, определяющая, сколько товаров влезает в выбранную упаковку
def _items_per_box(LENGTH: float,
                   WIDTH: float,
                   HEIGTH: float,
                   a: float,
                   b: float,
                   c: float) -> int:
    '''
    на входе:
    - стороны коробки LENGTH, WIDTH, HEIGTH
    - размеры единицы товара a, b, c

    на выходе:
    - максимальное число товаров в коробке при одинаковой ориентации товаров
    - best_orient - задел для улучшения алгоритма, пока не учитывается
    '''
    import copy
    three_sides = list([a, b, c])
    n = 0
    best_orient = {}
    for x in three_sides:
        two_sides = copy.deepcopy(three_sides)
        two_sides.remove(x)
        for y in two_sides:
            z = copy.deepcopy(two_sides)
            z.remove(y)
            z = z[0]
            n1 = LENGTH // x
            n2 = WIDTH // y
            n3 = HEIGTH // z
            if n1 * n2 * n3 > n:
                n = n1 * n2 * n3
                best_orient['LENGTH'] = x
                best_orient['WIDTH'] = y
                best_orient['HEIGTH'] = z
    return n


# функция, определяющая k наиболее дешевых варианта упаковки для выбранного класса и количества товаров
def _best_variants_for_class(items_cnt: int,
                             a: float,
                             b: float,
                             c: float,
                             class_choice: int,
                             variants_cnt: int = 2
                             ) -> pd.DataFrame:
    '''
    на входе: количество единиц товара, габариты товара, интересующий класс, n вариантов внутри класса

    на выходе: DataFrame(Тип упаковки, стоимость упаковки, кол-во товаров, вместимость упаковки, количество упаковок, итого цена за упаковки)
    '''
    prices_cartons_dict = {}
    full_prices = []
    result = pd.DataFrame(columns=[
        'cartontype', 'carton_price', 'items_cnt',
        'items_per_carton', 'cnt_cartons', 'full_cartons_price'
    ])
    if class_choice == 0:
        result.loc[len(result.index)] = ['NONPACK/STRETCH', 0, items_cnt, None, None, 0]
        return result
    for index, row in carton_data.iterrows():
        if row['y_target'] == class_choice:
            items_per_carton = int(_items_per_box(row['length'], row['width'], row['height'], a, b, c))
            if items_per_carton == 0:
                continue
            cnt_cartons = math.ceil(items_cnt / items_per_carton)
            full_cartons_price = cnt_cartons * row['price']
            prices_cartons_dict[full_cartons_price] = [row['cartontype'], row['price'], items_cnt, items_per_carton, cnt_cartons, full_cartons_price]
            full_prices.append(full_cartons_price)
    full_prices.sort()

    for price in full_prices[: variants_cnt]:
        result.loc[len(result.index)] = prices_cartons_dict[price]

    # если предлагаемый класс/классы не подошли (например, очень большой товар), то предлагается 'NONPACK/STRETCH'
    if len(result) == 0:
        result.loc[len(result.index)] = ['NONPACK/STRETCH', 0, items_cnt, None, None, 0]
    return result


# функция, определяющая, для каких классов проводить оптимизацию
def _class_choise(class_0: float, class_1: float, class_2: float, second_class_diff_less: float = 0.1) -> list:
    '''
    на входе: вероятности классов упаковок для sku

    class_0 - без упаковки

    class_1 - пакеты

    class_2 - коробки

    на выходе: список возможных классов в порядке уменьшения приоритета
    '''
    class_list = [class_0, class_1, class_2]
    first_value = sorted(class_list)[-1]
    second_value = sorted(class_list)[-2]
    if first_value - second_value < second_class_diff_less:
        return [class_list.index(first_value), class_list.index(second_value)]
    else:
        return [class_list.index(first_value)]


# функция подготовки рекомендательного DataFrame по sku (товару)
def _sku_recomendations(items_cnt: int, a: float, b: float, c: float, class_0: int, class_1: int, class_2: int,
                        second_class_diff_less: float = 0.1,
                        variants_cnt: int = 2) -> pd.DataFrame:
    '''
    на входе: информация из модели по sku

    на выходе: датафрейм с рекомендациями по этому sku
    '''
    list_of_classes = _class_choise(class_0, class_1, class_2, second_class_diff_less)
    sku_result = pd.DataFrame()
    for class_choice in list_of_classes:
        sku_result = pd.concat([sku_result, _best_variants_for_class(items_cnt, a, b, c, class_choice, variants_cnt)], ignore_index=True)
    return sku_result


# функция подготовки рекомендательного DataFrame по входящему DataFrame (и по одному orderkey (заказу), и по нескольким)
def orderkey_recomendations(from_model_data: pd.DataFrame, second_class_diff_less: float = 0.1, variants_cnt: int = 2) -> pd.DataFrame:
    '''
    на входе:
    - датафрейм(['orderkey', 'sku', 'items_cnt', 'a', 'b', 'c', 'goods_wght', 'cargotype', 'class_0', 'class_1', 'class_2'])
    - second_class_diff_less - максимально допустимая разница в вероятностях двух наиболее вероятных классов, чтобы дать рекомендацию по второму классу
    - variants_cnt - максимальное количество рекомендаций по одному товару в по одному классу

    на выходе:
    - датафрейм с рекомендациями по всем входящим sku
    '''
    result_df = pd.DataFrame()
    for index, row in from_model_data.iterrows():
        sku_result = _sku_recomendations(
            row['items_cnt'], row['a'], row['b'], row['c'],
            row['class_0'], row['class_1'], row['class_2'],
            second_class_diff_less, variants_cnt
        )
        sku_result['orderkey'] = row['orderkey']
        sku_result['sku'] = row['sku']
        sku_result = sku_result[[
            'orderkey', 'sku', 'cartontype', 'carton_price',
            'items_cnt', 'items_per_carton', 'cnt_cartons',
            'full_cartons_price'
        ]]

        result_df = pd.concat([result_df, sku_result], ignore_index=True)
    return result_df
