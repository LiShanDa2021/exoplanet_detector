# Database  

After finding some workable datasets, we created tables in pgAdmin and linked that to AWS. Currently, we have 4 tables in AWS(Confirmed_planets1, Orbital_radius, Confirmed_planet_orbit, and false_planets). We built 3 tables and then joined the confirmed_planets_table and the orbital_radius table to get the confirmed_planet_orbit table. 

-(Data\Confirmed_Planets_Table.sql)
-(Data\false_planets.sql)
-(Data\Orbital_Radius.sql)
-(Data\Add_Orbit_radius.sql)

To connect our scripts to AWS, we used sqlAlchemy

(Data\ERD.png)

[Back](README.md)
