from config import *

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, MetaData, Table

from flask import Flask
from flask import render_template, url_for
from flask import request

import pandas as pd

engine = sqlalchemy.create_engine(database_url)
connection = engine.connect()

# Declare a Base using `automap_base()`
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Print all of the classes mapped to the Base
Base.classes.keys()

#load planet data
planets_df = pd.read_sql_table('confirmed_planets1', engine)
#print(planets_df['planet_name'][0])

# create instance of Flask app
app = Flask(__name__)
# create route that renders index.html template
@app.route("/")
def index():
    team_list = ["Jumpers", "Dunkers", "Dribblers", "Passers"]
    return render_template("index.html", list=team_list)

@app.route("/")
def index():
    player_dictionary = {"player_1": "Jessica", "player_2": "Mark"}
    return render_template("index.html", dict=player_dictionary)

if __name__ == "__main__":
    app.run(debug=True)


