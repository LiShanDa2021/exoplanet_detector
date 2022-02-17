
from config import *
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, MetaData, Table

from flask import Flask
from flask import render_template, url_for, jsonify
from flask import request
from flask import Response

import pandas as pd
import random

engine = sqlalchemy.create_engine(database_url)
connection = engine.connect()

# Declare a Base using `automap_base()`
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Print all of the classes mapped to the Base
print('Tables: ',Base.classes.keys())

# get planets
confirmed_planets = Base.classes.confirmed_planets1


# create instance of Flask app
app = Flask(__name__)

# here!! transfer
@app.route('/')
def test_page_view():
    return render_template("index.html")

@app.route('/api/close_planet_data')
def planetAPI():
    session = Session(engine)
    close_planet_data = session.query(confirmed_planets.planet_name, confirmed_planets.distance, confirmed_planets.planet_mass, confirmed_planets.planet_radius, confirmed_planets.equilibrium_temperature).filter(confirmed_planets.distance < 200).all()

    close_planet_df = pd.DataFrame(close_planet_data)
    close_planet_df.columns = ['Planet Name', 'Distance from Earth', 'Planet Mass', 'Planet Radius', 'Equilibrium Temperature']
    close_planet_df.set_index('Planet Name')
    close_planet_json=close_planet_df.to_json(orient='columns', index='Planet Name')

    return close_planet_json

@app.route('/api/close_star_data')
def starAPI():
    session = Session(engine)
    close_star_data = session.query(confirmed_planets.host_name, confirmed_planets.distance, confirmed_planets.stellar_radius, confirmed_planets.stellar_effective_temperature).filter(confirmed_planets.distance < 100).all()

    close_star_df = pd.DataFrame(close_star_data)
    close_star_df.columns = ['Star Name', 'Distance from Earth', 'Stellar Radius', 'Stellar Temperature']
    close_star_df.set_index('Star Name')
    close_star_json=close_star_df.to_json(orient='columns', index='Star Name')

    return close_star_json

#####################################################################################################################
# query strings for later use once we find out how to work this thing
# close_planet_data = session.query(confirmed_planets.planet_name, confirmed_planets.distance, 
#                                   confirmed_planets.planet_mass, confirmed_planets.planet_radius, 
#                                   confirmed_planets.equilibrium_temperature).filter(confirmed_planets.distance < 100).all()
#####################################################################################################################
# close_star_data = session.query(confirmed_planets.host_name, confirmed_planets.distance, confirmed_planets.stellar_radius, confirmed_planets.stellar_effective_temperature).filter(confirmed_planets.distance < 100)
#####################################################################################################################

# create func to handle json requests
# tutorials? -- flask
# render main page with some data
# the simple thing that tyler would do is
# connect to db, not load to json file
# for now, stick with simple static page
# query db
# filter
# decide the data for the user before passing to front end
# not passing unnecessary columns
# subset
# functions that get stuff
# get data for plot a
# get data for plot b

# filter data in pandas before passing on
# instead of doing dumb sql request,
# do smart query
# where to do query?

# add another route
# request daterange to data

# module 9 day 2 activities activity 8

if __name__ == "__main__":
    app.run(debug=True)







# #load planet data
# planets_df = pd.read_sql_table('confirmed_planets1', engine)
# planets_json = planets_df.to_json()

# close_planets_df = planets_df.loc[planets_df['distance'] <= 200]
# close_planets_json = close_planets_df.to_json()

# # sample input from python for test page
# input_from_python = (planets_df['planet_name'][random.randrange(0, 2620, 1)])