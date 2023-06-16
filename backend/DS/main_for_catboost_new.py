from DS.project_functions.optimization_functions_new import recomendations
from DS.project_functions.predict_functions_for_catboost import (
    prediction_from_json,
)


def predict(data):
    from_model_data = prediction_from_json(data)
    recomendation_df = recomendations(
        from_model_data, second_class_diff_less=0.00001, variants_cnt=1
    )
    print(recomendation_df)
    recomendation = recomendation_df.to_json()
    return recomendation