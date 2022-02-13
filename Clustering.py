# Import Dependencies
import hvplot.pandas
from path import Path
import plotly.express as px
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, MetaData, Table
import os


def Clustering():

    #Create Connection to AWS
    database_url = 'postgresql://Brute_Force:daisy_mozart_chorizo@exoplanets1.c8rvp46kd4vt.us-east-1.rds.amazonaws.com/confirmed_planets1'

    engine= create_engine(database_url)
    connection = engine.connect()

    df = pd.read_sql_table('confirmed_planets1', engine)

    df2 = df.drop(['planet_name', 'distance', 'host_name', 'koi_name', 'exoplanet_archive_disposition', 'orbital_period', 'transit_epoch', 'impact_parameter', 'insolation_flux',
               'transit_signal_to_noise', 'tce_planet_number', 'stellar_surface_gravity', 'stellar_effective_temperature', 'stellar_radius', 'ra', 'kepler_band'], axis=1)



    df2 = df2.drop(['transit_duration', 'transit_depth', 'decimal_degrees', 'planetary_radius'], axis=1)

    #Use get_dummmies() to create variables for text features
    X= pd.get_dummies(df2, columns=['planet_mass', 'planet_radius', 'equilibrium_temperature'])


    #Standardize the data with StandardScaler()
    X_scaled = StandardScaler().fit_transform(X)


    #Using PCA to reduce dimension to three principal components
    pca = PCA(n_components = 3)


    index = (X.index.tolist())


    #Create a DataFrame with 3 principal components
    X_pca = pca.fit_transform(X_scaled)
    pca_df = pd.DataFrame(data=X_pca, columns =['PC1', 'PC2', 'PC3'], index = index)


    #Create and elbow curve to find the best value for K
    inertia = []
    k = list(range(1,11))

    for i in k:
        km = KMeans(n_clusters=i)
        km.fit(pca_df)
        inertia.append(km.inertia_)


    elbow = {'k': k, 'inertia': inertia}
    elbow_df = pd.DataFrame(elbow)
    elbow_df.hvplot.line(x='k' , y='inertia', title= 'Elbow Curve', xticks=k)


    # Initialize the K-Means model.
    model= KMeans(n_clusters=6)

    # Fit the model
    model.fit(pca_df)

    # Predict clusters
    predictions = model.predict(pca_df)

    pca_df['Class'] = model.labels_


    # Create a new DataFrame including predicted clusters and cryptocurrencies features.
    # Concatentate the crypto_df and pcs_df DataFrames on the same columns.
    clustered_df= df2.join(pca_df, how='inner')


    #  Add a new column, "CoinName" to the clustered_df DataFrame that holds the names of the cryptocurrencies. 
    # clustered_df = clustered_df.join(crypto_names, how='inner')


    # Creating a 3D-Scatter with the PCA data and the clusters
    fig = px.scatter_3d(
        clustered_df,
        x='PC1', 
        y='PC2',
        z='PC3',
        color='Class',
        symbol='Class',
        hover_name='Class',
        hover_data=['planet_mass','planet_radius','equilibrium_temperature'])
    fig.update_layout(legend=dict(x=0, y=1))
    fig.show()
    




