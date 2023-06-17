import copy
import os

import pandas as pd
from py3dbp import Bin, Item, Packer

from packman.settings import BASE_DIR

carton_data_location = os.path.join(BASE_DIR, "project_data", "carton_data.csv")
carton_data = pd.read_csv(carton_data_location)

# зададим функцию инициализации упаковщика
def _packing_remains(bin_specs, item_specs):
    global packer
    packer = Packer()
    for b in bin_specs:
        packer.add_bin(Bin(*b))
    for i in item_specs:
        packer.add_item(Item(*i))
        
    packer.pack(distribute_items=False)


# зададим функцию выбора наиболее вероятного класса
def _first_class(class_0, class_1, class_2):
    class_list = [class_0, class_1, class_2]
    first_value = sorted(class_list)[-1]
    return class_list.index(first_value)


# зададим функцию подготовки DataFrame из предсказания
def data_prep(prediction):
    preparated_data_class_0 = []
    preparated_data_class_1 = []
    preparated_data_class_2 = []
    for index, row in prediction.iterrows():
        if _first_class(row['class_0'], row['class_1'], row['class_2']) == 0:
            for _ in range(row['items_cnt']):
                preparated_data_class_0.append((row['sku'], row['a'], row['b'], row['c'], 0))
        elif _first_class(row['class_0'], row['class_1'], row['class_2']) == 1:
            for _ in range(row['items_cnt']):
                preparated_data_class_1.append((row['sku'], row['a'], row['b'], row['c'], 0))
        elif _first_class(row['class_0'], row['class_1'], row['class_2']) == 2:
            for _ in range(row['items_cnt']):
                preparated_data_class_2.append((row['sku'], row['a'], row['b'], row['c'], 0))

    return [preparated_data_class_1, preparated_data_class_2]


# зададим функцию создания спецификаций по классу
def spec_build(carton_data, class_x):
    specs = []
    for index, row in carton_data.query('y_target == @class_x')[['cartontype', 'length', 'width', 'height', 'price']].iterrows():
        specs.append((row))
    return specs


# зададим спецификации для классов 1 и 2
specs = [spec_build(carton_data, 1), spec_build(carton_data, 2)]


# зададим функцию упаковывания
def recomendations(prediction, specs):
    preparated_data = data_prep(prediction)
    bins = []
    total_price = 0
    for item_specs, bin_specs in  zip(preparated_data, specs):
        pack_list = []
        packed_items = 0
        pack_price = 0
        remained_items = copy.deepcopy(item_specs)
        
        iters = 0
        while len(remained_items) > 0 and iters < 10:
            iters += 1
            _packing_remains(bin_specs, remained_items)
            best_pack = pd.DataFrame([[b.string(), b.max_weight, len(b.items), b.unfitted_items] for b in packer.bins], 
                                    columns=['pack', 'price', 'items_count', 'remains'])\
                                    .sort_values(by=['items_count', 'price'], ascending=[False, True]).iloc[0]
            pack_list.append(best_pack[0])
            pack_price += best_pack[1]
            packed_items += best_pack[2]
            remained_items = [(i.name, i.width, i.height, i.depth, 0) for i in best_pack[3]]

        packed_items_short = [i[:3] for i in pack_list]
        bins.extend(packed_items_short)
        total_price += pack_price
        d = {'orderkey': prediction['orderkey'][0], 'recomended_packs': [bins], 'total_price': total_price}
    return pd.DataFrame(data=d)