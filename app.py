from config import *

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, MetaData, Table

from flask import Flask
from flask import render_template, url_for
from flask import request

import pandas as pd

import random

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

# see if it works if I add the image url here
#planet_image_url = 'Background.jpg'

# sample input from python for test page
input_from_python = (planets_df['planet_name'][random.randrange(0, 2620, 1)])

# create instance of Flask app
app = Flask(__name__)

# here!! transfer
@app.route('/')
def test_page_view():
    return render_template("index.html", input_from_python=input_from_python)

if __name__ == "__main__":
    app.run(debug=True)



