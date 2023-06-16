import copy
import os
import pickle

import pandas as pd

from packman.settings import BASE_DIR

model_location = os.path.join(
    BASE_DIR, "DS", "project_model", "best_cb.pickle"
)

# грузим модель
with open(model_location, "rb") as fin:
    best_cb = pickle.load(fin)


# Функция фильтрации исходных данных из json
def _filtration_from_json(data):
    # Создаём датафрейм с исходными данными
    X_data = copy.deepcopy(data)
    X_data = pd.DataFrame(X_data['items'])
    X_data.columns = [
        'sku',
        'items_cnt',
        'a',
        'b',
        'c',
        'goods_wght',
        'cargotype',
    ]

    # Приведем нужные для фича-инжениринг столбцы к типу float
    float_col = ['a', 'b', 'c', 'goods_wght']
    for col in float_col:
        X_data[col] = X_data[col].astype('float')

    # Создаём датафреймы для отфильтрованых по карготипу данных и для ML
    filtered_data = pd.DataFrame(
        columns=[
            'sku',
            'items_cnt',
            'a',
            'b',
            'c',
            'goods_wght',
            'cargotype',
            'class_0',
            'class_1',
            'class_2',
        ]
    )
    ml_data = pd.DataFrame(
        columns=['sku', 'items_cnt', 'a', 'b', 'c', 'goods_wght', 'cargotype']
    )

    # Выполняем фильтрацию по карготипу, заполняя созданные датафреймы по
    # заданным условиям
    for sku in X_data.index:
        if (
            '340' in X_data.loc[sku, 'cargotype']
            or '360' in X_data.loc[sku, 'cargotype']
        ):
            filtered_data = pd.concat(
                [filtered_data, pd.DataFrame([X_data.loc[sku, :]])],
                ignore_index=True,
            )
            filtered_data['class_0'] = 1
        else:
            ml_data = pd.concat(
                [ml_data, pd.DataFrame([X_data.loc[sku, :]])],
                ignore_index=True,
            )

    # Заполняем образовавшиеся пропуски нулями и добавляем столбец с заказом
    # (нужен для модели оптимизации)
    ml_data = ml_data.reset_index(drop=True)
    ml_data.insert(0, 'orderkey', data['orderId'])
    filtered_data = filtered_data.fillna(0).reset_index(drop=True)
    filtered_data.insert(0, 'orderkey', data['orderId'])
    return filtered_data, ml_data


# Функция фильтрации исходных данных из DataFrame
def _filtration_from_df(data):
    # Создаём датафрейм с исходными данными
    X_data = copy.deepcopy(data)
    # если cargotype в виде строки, то преобразуем в список
    # если уже в виде списка, то пропускаем
    try:
        X_data['cargotype'] = X_data['cargotype'].apply(lambda x: x.split())
    except AttributeError:
        pass

    # Приведем нужные для фича-инжениринг столбцы к типу float
    float_col = ['a', 'b', 'c', 'goods_wght']
    for col in float_col:
        X_data[col] = X_data[col].astype('float')

    # Создаём датафреймы для отфильтрованых по карготипу данных и для ML
    filtered_data = pd.DataFrame(
        columns=[
            'orderkey',
            'sku',
            'items_cnt',
            'a',
            'b',
            'c',
            'goods_wght',
            'cargotype',
            'class_0',
            'class_1',
            'class_2',
        ]
    )
    ml_data = pd.DataFrame(
        columns=[
            'orderkey',
            'sku',
            'items_cnt',
            'a',
            'b',
            'c',
            'goods_wght',
            'cargotype',
        ]
    )

    # Выполняем фильтрацию по карготипу, заполняя созданные датафреймы по
    # заданным условиям
    for sku in X_data.index:
        if (
            '340' in X_data.loc[sku, 'cargotype']
            or '360' in X_data.loc[sku, 'cargotype']
        ):
            filtered_data = pd.concat(
                [filtered_data, pd.DataFrame([X_data.loc[sku, :]])],
                ignore_index=True,
            )
            filtered_data['class_0'] = 1
        else:
            ml_data = pd.concat([ml_data, pd.DataFrame([X_data.loc[sku, :]])])

    # Заполняем образовавшиеся пропуски нулями и добавляем столбец с заказом
    # (нужен для модели оптимизации)
    ml_data = ml_data.reset_index(drop=True)
    filtered_data = filtered_data.fillna(0).reset_index(drop=True)
    return filtered_data, ml_data


# Функция подготовки данных для ML
def _preprocessing_ml_data(
    ml_data,
    cat_columns=[
        '1010',
        '1011',
        '110',
        '120',
        '130',
        '1300',
        '140',
        '160',
        '20',
        '200',
        '210',
        '290',
        '291',
        '292',
        '300',
        '302',
        '303',
        '305',
        '310',
        '315',
        '320',
        '330',
        '340',
        '350',
        '360',
        '40',
        '400',
        '410',
        '440',
        '441',
        '460',
        '480',
        '485',
        '490',
        '510',
        '520',
        '600',
        '601',
        '610',
        '611',
        '620',
        '621',
        '622',
        '640',
        '641',
        '670',
        '671',
        '672',
        '673',
        '690',
        '691',
        '692',
        '710',
        '720',
        '750',
        '751',
        '770',
        '780',
        '790',
        '799',
        '801',
        '81',
        '900',
        '901',
        '905',
        '908',
        '910',
        '911',
        '920',
        '930',
        '931',
        '950',
        '955',
        '960',
        '970',
        '980',
        '990',
    ],
):
    # создаём датафрейм для фичей, чтобы преобразованиями не менять
    # исходные данные
    X = copy.deepcopy(ml_data)

    # удаляем столбец с заказом, формируем столбец с количеством заказов
    # и приводим столбцы к нужному для модели порядку
    X = X.drop(['orderkey'], axis=1)
    X['sku_cnt'] = X['sku'].nunique()
    X = X.reindex(
        columns=[
            'sku',
            'goods_wght',
            'items_cnt',
            'sku_cnt',
            'a',
            'b',
            'c',
            'cargotype',
        ]
    )

    # создаём датафрейм со столбцами для категориальных фичей
    # и заполним их нулями
    df_cat_columns = pd.DataFrame(columns=cat_columns)
    X = pd.concat([X, df_cat_columns], axis=1).fillna(0)

    # проводим фича инжениринг
    X['total_pack_volume'] = X['a'] * X['b'] * X['c'] * X['items_cnt']
    X['ab'] = X['a'] * X['b']
    X['bc'] = X['c'] * X['b']
    X['ac'] = X['a'] * X['c']
    X['total_pack_wght'] = X['goods_wght'] * X['items_cnt']
    X['density'] = X['total_pack_wght'] / X['total_pack_volume']

    # удаляем ненужный для модели признак
    X = X.drop(['goods_wght'], axis=1)
    # заполняем единицами нужные ячейки с карготипами
    for sku in X.index:
        for cargotype in X.loc[sku, 'cargotype']:
            X.loc[sku, cargotype] = 1

    # удаляем ненужные столбцы
    X = X.drop(['cargotype', 'sku'], axis=1)

    return X


# Функция предсказания
def _prediction(prediction_data, model=best_cb):
    if len(prediction_data) == 0:
        return None
    else:
        predictions = model.predict_proba(prediction_data)
        predictions = pd.DataFrame(
            predictions, columns=['class_1', 'class_0', 'class_2']
        )
        # меняем порядок столбцов для модели оптимизации
        predictions = predictions.reindex(
            columns=['class_0', 'class_1', 'class_2']
        )
        return predictions


# функции формирования датафрейма с предсказаниями
def prediction_from_json(json) -> pd.DataFrame:
    '''
    на входе: JSON файл с признаками

    на выходе: DataFrame для оптимизационной модели
    '''
    filtered_data, ml_data = _filtration_from_json(json)
    X = _preprocessing_ml_data(ml_data)
    predictions = _prediction(X)
    if len(ml_data) == 0:
        order_predictions = None
    else:
        order_predictions = pd.concat(
            [
                ml_data.reset_index(drop=True),
                predictions.reset_index(drop=True),
            ],
            axis=1,
        )
    order_predictions = pd.concat(
        [order_predictions, filtered_data]
    ).reset_index(drop=True)
    return order_predictions


def prediction_from_df(dataframe) -> pd.DataFrame:
    '''
    на входе: DataFrame с признаками

    на выходе: DataFrame для оптимизационной модели
    '''
    filtered_data, ml_data = _filtration_from_df(dataframe)
    X = _preprocessing_ml_data(ml_data)
    predictions = _prediction(X)
    if len(ml_data) == 0:
        order_predictions = None
    else:
        order_predictions = pd.concat(
            [
                ml_data.reset_index(drop=True),
                predictions.reset_index(drop=True),
            ],
            axis=1,
        )
    order_predictions = pd.concat(
        [order_predictions, filtered_data]
    ).reset_index(drop=True)
    return order_predictions
