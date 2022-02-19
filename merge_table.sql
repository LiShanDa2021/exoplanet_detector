CREATE TABLE Confirmed_Planets_Orbit AS (
	Select confirmed_planets1.*
	FROM confirmed_planets1 Inner JOIN 
	orbital_radius on confirmed_planets1.Planet_name = orbital_radius.Planet_name);

