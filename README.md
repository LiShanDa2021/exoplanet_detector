
# Exoplanet Detector

## Presentation:
### Project Overview: 

Our project is Exoplanet detection. The goal is to develop a machine learning model that will determine which candidates from Keppler Space Telescope dataset are planets or not. 
We chose this topic because we each like and enjoy the scifi genre and we all gravitated towards outer space. We think that automating planet hunting could make the process a little more efficient. It'll also allow scientists and NASA which areas of space to focus on and may lead to more groundbreaking discoveries. We wanted to practice machine learning with a real dataset that provided additional challenges that we wanted to face head on. 

### Data:

Our data comes from the NASA Keppler Space Telescope dataset from Exoplanet Archive at Cal Tech. Data starts in CSV format with 49 features and 9,564 rows. Includes information about the star the object is orbiting, statistics of potential exoplanets (i.e radius, orbital period, etc.)

### Question we hope to Answer:

Given our dataset, can we predict whether or not the observed event represenets a true exoplanet. From the confirmed candidates we find, how many are possibly habitable (based on mass and radius)? 

Can we automate planet detection?


## GitHub:

Communication plan: We will communicate on slack and meet via google or teams. Check in on Sundays and Tuesdays and as needed. 


## Machine Learning:

Supervised Machine learning algorithm using Python and Tensorflow library. At this time, still undetermined wheter we will use Random Forest, SVM, or deep learning. Deep learning might serve our well since we have so many features. End goal with machine learning is to determine if the object is an exoplanet and if it habitable planet and will then apply the algorithm to the TESS dataset. TESS (transitting exoplanet survey satellite) is an active planet hunting mission and we hope our algorithm can assist in identifying exoplanets. 


## Database Integration:
SQL and AWS- switching from Mongo to these two. After several initial attempts to integrate, we were not having any luck. Deciding to switch to Sql for simplicity. 

AWS Database- exoplanets


## Dashboard and Visualization:
Using HTML and JS to create an interactive dashboard to show the relative sizes of exoplanets and the stars that they orbit as well as their distance from earth. 


## Technologies Used:
    +Python (pandas, tensorflow, keras, sklearn)
    +HTML 
    +JavaScript
    +MongoDB
    +GitHub



