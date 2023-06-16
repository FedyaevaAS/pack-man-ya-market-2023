from DS.project_functions.optimization_functions_new import (
    recomendations,
    specs,
)
from DS.project_functions.predict_functions_for_catboost import (
    prediction_from_json,
)


def predict(data):
    from_model_data = prediction_from_json(data)
    recomendation_df = recomendations(from_model_data, specs)
    return recomendation_df
