CREATE TABLE confirmed_planet_orbit AS(
SELECT koi_name, planet_mass, planet_radius, distance, host_name,
	exoplanet_archive_disposition, orbital_period, transit_epoch,
	impact_parameter, transit_duration, transit_depth,
	planetary_radius, equilibrium_temperature, insolation_flux,
	transit_signal_to_noise, tce_planet_number, stellar_effective_temperature,
	stellar_surface_gravity, stellar_radius, ra, decimal_degrees, kepler_band,orbital_radius.orbit_semi_major_axis
from confirmed_planets1
full outer join orbital_radius
on confirmed_planets1.planet_name = orbital_radius.planet_name
)

[Back](https://github.com/LiShanDa2021/exoplanet_detector/blob/main/Data/Data.md)

