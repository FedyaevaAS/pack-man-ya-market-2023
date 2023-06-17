from DS.project_functions.optimization_functions import orderkey_recomendations
from DS.project_functions.predict_functions_for_catboost import \
    prediction_from_json


def predict(data):
    from_model_data = prediction_from_json(data)
    recomendation_df = orderkey_recomendations(
        from_model_data, second_class_diff_less=0.00001, variants_cnt=1
    )
    return recomendation_df
