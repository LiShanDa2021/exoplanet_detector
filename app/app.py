from collections import defaultdict
try:
    from config import CONFIG
except ImportError:
    CONFIG = defaultdict(str)
import numpy as np
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, MetaData, Table
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask import render_template, url_for, jsonify
from flask import request
from flask import Response

import pandas as pd
import random

app = Flask(__name__)
database_url = os.environ.get("DATABASE_URL2", CONFIG["DATABASE_URL2"])
engine = create_engine(database_url)
connection = engine.connect()

# Declare a Base using `automap_base()`
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Print all of the classes mapped to the Base
print('Tables: ',Base.classes.keys())

# get planets

session = Session(engine)
planet_df = pd.read_sql_table('confirmed_planets1', engine)
orbit_df = pd.read_sql_table('orbital_radius', engine)
planet_df['Distance from Host Star'] = orbit_df['orbit_semi_major_axis']
z = planet_df['host_name'].value_counts()
z1 = z.to_dict()
planet_df['Number of Planets in System'] = planet_df['host_name'].map(z1)
planet_df
conditions = conditions = [((planet_df['equilibrium_temperature'] >= 200) & (planet_df['equilibrium_temperature'] <= 320)
               & (planet_df['planet_radius'] >= .5) & (planet_df['planet_radius'] <= 1.6)),
              ((planet_df['equilibrium_temperature'] >= 200) & (planet_df['equilibrium_temperature'] <= 330)
               & (planet_df['planet_radius'] > 1.6) & (planet_df['planet_radius'] <= 2.5)),
              ((planet_df['equilibrium_temperature'] < 200) | (planet_df['equilibrium_temperature'] > 330)
               | (planet_df['planet_radius'] < .5) | (planet_df['planet_radius'] > 2.5))]
values = [2,1,0]
planet_df['Habitability'] = np.select(conditions, values)
planet_df = planet_df.drop(columns=['koi_name', 'exoplanet_archive_disposition', 'orbital_period',
       'transit_epoch', 'impact_parameter', 'transit_duration',
       'transit_depth', 'planetary_radius', 'insolation_flux',
       'transit_signal_to_noise', 'tce_planet_number',
       'stellar_surface_gravity', 'ra', 'decimal_degrees', 'kepler_band'], axis=1)
print(planet_df.columns)
planet_df.columns = ['Planet Name', 'Planet Mass', 'Planet Radius', 'Distance from Earth', 'Star Name', 'Equilibrium Temperature', 'Stellar Temperature', 'Stellar Radius', 'Distance from Host Star', 'Number of Planets in System', 'Habitability']
planet_df.set_index('Planet Name')
planet_df = planet_df

# create instance of Flask app
#app = Flask(__name__)
#db=SQLAlchemy(app)

# here!! transfer
@app.route('/')
def test_page_view():
    return render_template("index.html")

@app.route('/machine-learning')
def machine_learning():
    return render_template("machine-learning.html")

@app.route('/clustering')
def clustering():
    return render_template("clustering.html")

@app.route('/summary')
def summary():
    return render_template("summary.html")

@app.route('/api/close_planet_data')
def planetAPI():
    close_planet_json=planet_df.to_json(orient='columns', index='Planet Name')

    return close_planet_json


if __name__ == "__main__":
    app.run(debug=True)