import pandas as pd
from pymongo import MongoClient
import json



def mongoimport(csv_path, db_name, coll_name, db_url='localhost', db_port=27017):
    client = MongoClient(db_url, db_port)
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.remove()
    coll.insert(payload)
    return coll.count()

planet_file = "/Users/alexhatheway/Desktop/DataViz/final_project_classes/exoplanet_detector/Cleaned_Planet_Exploration_Data.csv"

mongoimport(planet_file, 'planetdb', 'planets')
