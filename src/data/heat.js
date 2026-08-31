export const fuelEfficiencyMass = {
  id: 'fuel-efficiency-mass', name: 'Fuel Efficiency - Mass', base: 'joule/kilogram [J/kg]',
  units: [
    ['joule/kilogram', 'J/kg', 1],
    ['kilojoule/kilogram', 'kJ/kg', 1000],
    ['calorie (IT)/gram', 'cal/g', 4186.8],
    ['calorie (th)/gram', '', 4184],
    ['Btu (IT)/pound', 'Btu/lb', 2326],
    ['Btu (th)/pound', '', 2324.4443888889],
    ['kilogram/joule', 'kg/J', 1, 'inv'],
    ['kilogram/kilojoule', 'kg/kJ', 1000, 'inv'],
    ['gram/joule', 'g/J', 1000, 'inv'],
    ['gram/calorie (IT)', '', 4186.8, 'inv'],
    ['pound/Btu (IT)', 'lb/Btu', 2326, 'inv'],
    ['pound/horsepower-hour', '', 5918352.5016, 'inv'],
    ['gram/horsepower (metric)-hour', '', 2647795500, 'inv'],
    ['gram/kilowatt-hour', '', 3600000000, 'inv'],
  ],
};

export const fuelEfficiencyVolume = {
  id: 'fuel-efficiency-volume', name: 'Fuel Efficiency - Volume', base: 'joule/cubic meter [J/m^3]',
  units: [
    ['joule/cubic meter', 'J/m^3', 1],
    ['joule/liter', 'J/L', 1000],
    ['megajoule/cubic meter', 'MJ/m^3', 1e6],
    ['kilojoule/cubic meter', 'kJ/m^3', 1000],
    ['kilocalorie (IT)/cubic meter', 'kcal/m^3', 4186.8],
    ['calorie (IT)/cubic centimeter', 'cal/cm^3', 4186800],
    ['therm/cubic foot', '', 3725894598.9],
    ['therm/gallon (UK)', '', 23207984510.267],
    ['Btu (IT)/cubic foot', 'Btu/ft^3', 37258.945807731],
    ['Btu (th)/cubic foot', '', 37234.028198186],
    ['CHU/cubic foot', '', 67066.102436837],
    ['cubic meter/joule', 'm^3/J', 1, 'inv'],
    ['liter/joule', 'L/J', 1000, 'inv'],
    ['gallon (US)/horsepower', '', 197000.0844, 'inv'],
    ['gallon (UK)/horsepower', '', 164018.5384, 'inv'],
  ],
};

export const temperatureInterval = {
  id: 'temperature-interval', name: 'Temperature Interval', base: 'kelvin [K]',
  units: [
    ['kelvin', 'K', 1],
    ['degree Celsius', 'deg C', 1],
    ['degree centigrade', '', 1],
    ['degree Fahrenheit', 'deg F', 0.5555555556],
    ['degree Rankine', 'deg R', 0.5555555556],
    ['degree Reaumur', 'deg r', 1.25],
  ],
};

export const thermalExpansion = {
  id: 'thermal-expansion', name: 'Thermal Expansion', base: 'length/length/kelvin [1/K]',
  units: [
    ['length/length/kelvin', '1/K', 1],
    ['length/length/degree Celsius', '1/C', 1],
    ['length/length/degree Fahrenheit', '1/F', 1.8],
    ['length/length/degree Rankine', '1/R', 1.8],
    ['length/length/degree Reaumur', '1/r', 0.8],
  ],
};

export const thermalResistance = {
  id: 'thermal-resistance', name: 'Thermal Resistance', base: 'kelvin/watt [K/W]',
  units: [
    ['kelvin/watt', 'K/W', 1],
    ['degree Fahrenheit hour/Btu (IT)', '', 1.8956342406],
    ['degree Fahrenheit hour/Btu (th)', '', 1.8969028295],
    ['degree Fahrenheit second/Btu (IT)', '', 0.0005265651],
    ['degree Fahrenheit second/Btu (th)', '', 0.000526917],
  ],
};

export const thermalConductivity = {
  id: 'thermal-conductivity', name: 'Thermal Conductivity', base: 'watt/meter/K [W/(m*K)]',
  units: [
    ['watt/meter/K', 'W/(m*K)', 1],
    ['watt/centimeter/degree Celsius', '', 100],
    ['kilowatt/meter/K', 'kW/(m*K)', 1000],
    ['calorie (IT)/second/cm/degree Celsius', '', 418.6800000009],
    ['calorie (th)/second/cm/degree Celsius', '', 418.4],
    ['kilocalorie (IT)/hour/meter/degree Celsius', '', 1.163],
    ['kilocalorie (th)/hour/meter/degree Celsius', '', 1.1622222222],
    ['Btu (IT) inch/second/sq. foot/degree Fahrenheit', '', 518.8731616576],
    ['Btu (th) inch/second/sq. foot/degree Fahrenheit', '', 518.2004979012],
    ['Btu (IT) foot/hour/sq. foot/degree Fahrenheit', '', 1.7307346664],
    ['Btu (th) foot/hour/sq. foot/degree Fahrenheit', '', 1.7284896148],
    ['Btu (IT) inch/hour/sq. foot/degree Fahrenheit', '', 0.1442278889],
    ['Btu (th) inch/hour/sq. foot/degree Fahrenheit', '', 0.1440408012],
  ],
};

export const specificHeatCapacity = {
  id: 'specific-heat-capacity', name: 'Specific Heat Capacity', base: 'joule/kilogram/K [J/(kg*K)]',
  units: [
    ['joule/kilogram/K', 'J/(kg*K)', 1],
    ['joule/kilogram/degree Celsius', '', 1],
    ['joule/gram/degree Celsius', '', 1000],
    ['kilojoule/kilogram/K', '', 1000],
    ['kilojoule/kilogram/degree Celsius', '', 1000],
    ['calorie (IT)/gram/degree Celsius', '', 4186.8],
    ['calorie (IT)/gram/degree Fahrenheit', '', 4186.8],
    ['calorie (th)/gram/degree Celsius', '', 4184],
    ['kilocalorie (IT)/kilogram/degree Celsius', '', 4186.8],
    ['kilocalorie (th)/kilogram/degree Celsius', '', 4184],
    ['kilocalorie (IT)/kilogram/K', '', 4186.8],
    ['kilocalorie (th)/kilogram/K', '', 4184],
    ['kilogram-force meter/kilogram/K', '', 9.8066500003],
    ['pound-force foot/pound/degree Rankine', '', 5.380320456],
    ['Btu (IT)/pound/degree Fahrenheit', '', 4186.8],
    ['Btu (th)/pound/degree Fahrenheit', '', 4184],
    ['Btu (IT)/pound/degree Rankine', '', 4186.8],
    ['Btu (th)/pound/degree Rankine', '', 4184],
    ['Btu (IT)/pound/degree Celsius', '', 2326.0000001],
    ['CHU/pound/degree Celsius', '', 4186.8],
  ],
};

export const heatDensity = {
  id: 'heat-density', name: 'Heat Density', base: 'joule/square meter [J/m^2]',
  units: [
    ['joule/square meter', 'J/m^2', 1],
    ['calorie (IT)/square centimeter', '', 41868],
    ['Langley', '', 41868],
    ['Btu (IT)/square foot', 'Btu/ft^2', 11356.526682227],
    ['Btu (th)/square foot', '', 11348.9310433],
    ['calorie (th)/square centimeter', '', 41840],
  ],
};

export const heatFluxDensity = {
  id: 'heat-flux-density', name: 'Heat Flux Density', base: 'watt/square meter [W/m^2]',
  units: [
    ['watt/square meter', 'W/m^2', 1],
    ['kilowatt/square meter', 'kW/m^2', 1000],
    ['watt/square centimeter', 'W/cm^2', 10000],
    ['watt/square inch', 'W/in^2', 1550.0031000062],
    ['joule/second/square meter', '', 1],
    ['kilocalorie (IT)/hour/square meter', '', 1.163],
    ['kilocalorie (IT)/hour/square foot', '', 12.5184278205],
    ['calorie (IT)/minute/square centimeter', '', 697.8],
    ['calorie (IT)/second/square centimeter', '', 41868],
    ['Btu (IT)/hour/square foot', '', 3.154590745],
    ['Btu (IT)/minute/square foot', '', 189.2754447038],
    ['Btu (IT)/second/square foot', '', 11356.526682227],
    ['Btu (th)/hour/square foot', '', 3.1524804132],
    ['Btu (th)/second/square foot', '', 11348.9310433],
    ['erg/second/square millimeter', '', 100],
    ['foot pound/minute/square foot', '', 0.2432317156],
    ['horsepower/square foot', '', 8026.6466174305],
    ['horsepower (metric)/square foot', '', 7916.8426564296],
  ],
};

export const heatTransferCoefficient = {
  id: 'heat-transfer-coefficient', name: 'Heat Transfer Coefficient', base: 'watt/square meter/K',
  units: [
    ['watt/square meter/K', 'W/(m^2*K)', 1],
    ['watt/square meter/degree Celsius', '', 1],
    ['joule/second/square meter/K', '', 1],
    ['kilocalorie (IT)/hour/square meter/degree Celsius', '', 1.163],
    ['kilocalorie (IT)/hour/square foot/degree Celsius', '', 12.5184278205],
    ['Btu (IT)/second/square foot/degree Fahrenheit', '', 20441.748028012],
    ['Btu (th)/second/square foot/degree Fahrenheit', '', 20428.077143681],
    ['Btu (IT)/hour/square foot/degree Fahrenheit', '', 5.6782633411],
    ['Btu (th)/hour/square foot/degree Fahrenheit', '', 5.6744658732],
    ['CHU/hour/square foot/degree Celsius', '', 5.6782633411],
  ],
};

export const heatGroup = {
  id: 'heat',
  name: 'Heat Converters',
  blurb: 'Thermal units for heat transfer and energy studies.',
  items: [
    fuelEfficiencyMass, fuelEfficiencyVolume, temperatureInterval, thermalExpansion,
    thermalResistance, thermalConductivity, specificHeatCapacity, heatDensity,
    heatFluxDensity, heatTransferCoefficient,
  ],
};
