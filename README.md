
# Exoplanet Detector

## Presentation:
### [Google Slides Presentation](https://docs.google.com/presentation/d/1eaPImFXlAEw8KDVOquqmDu-2rw82H8avftx5OCL4-GQ/edit?usp=sharing)

### Project Overview: 

Our project is Exoplanet detection. The goal is to develop a machine learning model that will determine which candidates from Keppler Space Telescope dataset are planets or not. 
We chose this topic because we each like and enjoy the scifi genre and we all gravitated towards outer space. We think that automating planet hunting could make the process a little more efficient. It'll also allow scientists and NASA which areas of space to focus on and may lead to more groundbreaking discoveries. We wanted to practice machine learning with a real dataset that provided additional challenges that we wanted to face head on. 

### Data:

[Data Information](https://github.com/LiShanDa2021/exoplanet_detector/blob/main/Data/Data.md)

Our data comes from the NASA Keppler Space Telescope dataset from Exoplanet Archive at Cal Tech. Data starts in CSV format with 49 features and 9,564 rows. Includes information about the star the object is orbiting, statistics of potential exoplanets (i.e radius, orbital period, etc.)

### Question we hope to Answer:

Given our dataset, can we predict whether or not the observed event represenets a true exoplanet. From the confirmed candidates we find, how many are possibly habitable (based on mass and radius)? 

Can we automate planet detection?


## Machine Learning:

### Preliminary data and Feature Selection: 
For our machine Learning module we took the data from the Kepler Objects of Interest cumulative table of 9,564 planets. Orignally, this data set had 49 columns with very confusing names. A good portion of the data had an upper and lower column for the number due to the varying degree of certainty when it came to said numbers. We removed the upper and lower column and changed the names of each column to be more readable. We also removed all the columns that were just there to flag the tranist event as False Positive so the machine learning module could not cheat. We also removed the columns that were more than 20% empty and those that were heavily skewed. After all of this preliminary data work, we ended up with 16 columns and 9,564 rows. The rows were then reduced to removed the NA's and any planet that was considered a planet candidate and our final machine learning data set finished with 7,247 rows. This left us with the most important features for our dataset, like Transit duration, orbital period, planetary radius, and Equilibrium temperature.
### Training Split: 
The training split was relativily straight forward with the data we had. We made a One hot encoder and split up the Exoplanet_archive_disposition into 1's and 0's and just kept the Exoplanet_Archive_disposition_CONFIRMED to do our analysis on. This left us with 4,582 False positives and 2,665 Confirmed Planets. After this was encoded, we used a training_test_validate method so as to really confirm that our data was training accuratelu. The training split we went with was 80/10/10 for training, validating, and testing respectively. This left us with 5797,725,725 respectively.
### Model choice: 
For our machine learning module we choose to do a deep learning nerual network. We choice this method because of the large number of features and data we had at our disposal. It also brought a challenging aspect to the data to really try and help push us to create the most realistic model we could as if we were making this for NASA itself. The benefits of this model choice are a neural networks amazing ability to store information and train machines. Neural networks allow the machine to learn events and make decisions by looking at similar events. Neural networks also are great at working with inadequate knowledge, and though we did have quite a bit of data for it to learn on, it is challenging to believe any knowledge is adequate for a machine predict what NASA scientists are unsure of themselves sometimes. The biggest limitation with this model choice is a Neural networks unexplainable nature. It is hard to understand and visualize what a machine Learning neural network is actually doing behind the scenes. We believe our accuracy and percision scores of roughly 90% outweigh this disadvantge, however.


## Database Integration:
SQL and AWS- switching from Mongo to these two. After several initial attempts to integrate, we were not having any luck. We ended up switching to SQL for simplicity. We then connected our SQL database in postgres to Amazon Web Services which we were then able to query in Python using sqlalchemy. Once we had the data in Python, we were able to manipulate and transform it in Pandas and then turn it into a JSON object. We used flask to create an api to hold the JSON data that we could then query in Javascript.


## Dashboard and Visualization:
We created our visuals in Javascript using Plotly JS and displayed them on our html page which served as our dashboard.

We created two scatterplots showing the relative sizes and temperatures of exoplanets and the stars that they orbit as well as their distance from earth. 

We also added images of our machine learning graphs.


## Technologies Used:
    +Python (pandas, tensorflow, keras, sklearn)
    +HTML 
    +JavaScript
    +Flask
    +GitHub



