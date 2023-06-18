# Разработка ML-модуля для веб-сервиса по подбору оптимальной упаковки заказа

## Отрасль и направления деятельности компании
Маркетплейс, сервис для покупки товаров

## Пользователь приложения
Работник склада (упаковщик)

## Общее описание задачи
* Для того, чтобы пользователь получил заказ, необходимо упаковать заказанные товары в посылки конечному клиенту. Компания заметила, что сотрудник тратит большое количество времени для выбора упаковочного материала в который необходимо упаковать товары. Существует большое количество упаковочного материала (коробочки, пакетики).
* Необходимо придумать способ подсказывать пользователю информацию о выборе упаковочного материала. Интерфейс упаковщика должен отображать содержимое заказа для контроля комплектности. Интерфейс упаковщика должен на основании содержимого заказа, подсказывать упаковщику в какую тару (коробку, пакет, с учетом размера) нужно упаковать заказ.
* При определении варианта упаковки (тары) для заказа нужно учитывать тип товара, весогабаритные характеристики и необходимость в дополнительной упаковке для хрупких товаров.

## Цели сервиса
* С высокой точностью рекомендовать правильную упаковку для заказа, которая позволит доставить товары без порчи клиенту и минимизирует затраты на упаковочный материал;
* Интерфейс о том, как советовать информацию по выбору коробки пользователю.

## Cтек
* Python: pandas, matplotlib, sklearn, optuna, catboost, tqdm, py3dbp
* Docker

## Концепция разработки ML-модуля, три блока

### Определяем тип упаковки
1. Первый блок: классический алгоритм для определения типа упаковки для заказов, тип упаковки которых можно достоверно определить без ML
2. Второй блок: ML-алгоритм для определения типа упаковки для заказов, по которым отсутствует возможность точного решения
### Определяем габариты упаковки
3. Третий блок: классический алгоритм для подбора оптимальных размеров упаковки

## Краткое описание первого блока
* Некоторые заказы содержат признаки (теги), по которым можно точно определить тип упаковки (например, тег "не упаковывать")

## Краткое описание второго блока
* Для **блока с ML** был определен бэйзлайн по рекомендациям старой модели: **f1_macro = 0,54** (на основе трёх классов)
* Была построена модель на основе CatBoostClassifier, для которой были подобраны гиперпараметры с помощью Optuna. Сама модель с этими параметрами сохранена в файл 'best_cb.pickle', [в директории](https://github.com/FedyaevaAS/pack-man-ya-market-2023/tree/main/backend/DS/project_model)
* Бейзлайн уверенно побит: **f1_macro = 0,74** (на основе трёх классов)

## Краткое описание третьего блока
  * получает из первого и второго блоков данные по наиболее вероятному классу (пакет, коробка, без упаковки/пленка)
  * в рамках наиболее вероятного класса перебирает все возможные типы упаковок, считает сколько в них может поместиться товаров и считает совокупную стоимость упаковки
  * выдает наиболее дешевый вариант на рассмотрение (можно доработать для выдачи нескольких наиболее дешевых вариантов, в порядке увеличения стоимости)

## Оценка бизнес метрики

<p align="left">
  <img width="700" height="250" src="https://github.com/FedyaevaAS/pack-man-ya-market-2023/blob/main/backend/DS/business-metric.png">
</p>

* В качестве бизнес-метрики выбрали совокупную стоимость упаковки заказа:
  * текущая средняя стоимость упаковки заказа 4.3 рубля
  * модельная средняя стоимость упаковки заказа 3.1 рубля
  * **модель экономит до 29% от текущих затрат**
* Модель экономит за счет того, что предлагает оборачивать в пупырку или не запаковывать товары, которые можно не запаковывать; а также рекомендует наиболее подходящие по габаритам упаковки для эффективного использования объема и, соответственно, минимизации стоимости.
* Чем больше товаров в заказе, тем больше экономия. Логично, т.к. чем больше товаров, тем сложнее упаковщику самостоятельно подобрать наилучший вариант
* Эффективность модели для заказов с большим (>10) количеством товаров сложно оценить из-за малого количества таких заказов

****
**Статус проекта: завершен**