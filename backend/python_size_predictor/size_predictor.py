from sklearn.neighbors import KNeighborsClassifier
from fastapi import FastAPI
from typing import Union
import numpy as np
import pickle


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/predict_size")
def read_item(weight: int,age:int,height:int,bmi:int):
    loaded_model = pickle.load(open('knnpickle_file', 'rb'))
    input = [weight, age, height, bmi]
    input = np.array(input)
    result = loaded_model.predict(input.reshape(1,-1))   # changes to be made for accuracy part
    list1 = []
    list1.append(result)
    data = list1[0][0]
    return {"Predicted size is": str(data)}

