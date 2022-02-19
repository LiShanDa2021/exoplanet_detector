CREATE TABLE false_planets (
	KOI_NAME varchar(50),
	Exoplanet_Archive_Disposition varchar(50),
	Orbital_Period float,
	Transit_Epoch float,
	Impact_Parameter float,
	Transit_Duration float,
	Transit_Depth float,
	Planetary_Radius float,
	Equilibrium_Temperature float,
	Insolation_Flux_Earth float,
	Transit_Signal_To_Noise float,
	Stellar_Effective_Temperature float,
	Stellar_Surface_Gravity float,
	Stellar_Radius float, 
	RA float,
	Decimal_Degrees float,
	Kepler_Band float,

	Primary Key (KOI_Name),
	Unique (KOI_Name)
)