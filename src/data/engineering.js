import { speed } from './common.js';

export const velocity = {
  id: 'velocity', name: 'Velocity', base: 'meter/second [m/s]',
  units: speed.units,
};

export const angularVelocity = {
  id: 'velocity-angular', name: 'Velocity - Angular', base: 'radian/second [rad/s]',
  units: [
    ['radian/second', 'rad/s', 1],
    ['radian/day', 'rad/d', 1.15741e-5],
    ['radian/hour', 'rad/h', 0.0002777778],
    ['radian/minute', 'rad/min', 0.0166666667],
    ['degree/day', 'deg/d', 2.0200570556e-7],
    ['degree/hour', 'deg/h', 4.8481368111e-6],
    ['degree/minute', 'deg/min', 0.0002908882],
    ['degree/second', 'deg/s', 0.0174532925],
    ['revolution/day', 'r/d', 7.2722052166e-5],
    ['revolution/hour', 'r/h', 0.0017453293],
    ['revolution/minute', 'r/min', 0.1047197551],
    ['revolution/second', 'r/s', 6.2831853072],
  ],
};

export const acceleration = {
  id: 'acceleration', name: 'Acceleration', base: 'meter/square second [m/s^2]',
  units: [
    ['meter/square second', 'm/s^2', 1],
    ['decimeter/square second', 'dm/s^2', 0.1],
    ['kilometer/square second', 'km/s^2', 1000],
    ['hectometer/square second', 'hm/s^2', 100],
    ['dekameter/square second', 'dam/s^2', 10],
    ['centimeter/square second', 'cm/s^2', 0.01],
    ['millimeter/square second', 'mm/s^2', 0.001],
    ['micrometer/square second', 'µm/s^2', 1e-6],
    ['nanometer/square second', 'nm/s^2', 1e-9],
    ['picometer/square second', 'pm/s^2', 1e-12],
    ['femtometer/square second', 'fm/s^2', 1e-15],
    ['attometer/square second', 'am/s^2', 1e-18],
    ['gal', 'Gal', 0.01],
    ['galileo', '', 0.01],
    ['mile/square second', 'mi/s^2', 1609.344],
    ['yard/square second', 'yd/s^2', 0.9144],
    ['foot/square second', 'ft/s^2', 0.3048],
    ['inch/square second', 'in/s^2', 0.0254],
    ['Acceleration of gravity', 'g', 9.80665],
  ],
};

export const angularAcceleration = {
  id: 'acceleration-angular', name: 'Acceleration - Angular', base: 'radian/square second',
  units: [
    ['radian/square second', 'rad/s^2', 1],
    ['radian/square minute', 'rad/min^2', 0.0002777778],
    ['radian/square hour', 'rad/h^2', 7.716049383e-8],
    ['radian/square day', 'rad/d^2', 1.3395919067e-10],
    ['revolution/square second', 'r/s^2', 6.2831853072],
    ['revolution/minute/second', 'r/(min*s)', 0.1047197551],
    ['revolution/square minute', 'r/min^2', 0.0017453293],
    ['revolution/square hour', 'r/h^2', 4.8481368111e-7],
    ['revolution/square day', 'r/d^2', 8.4168347762e-10],
  ],
};

export const density = {
  id: 'density', name: 'Density', base: 'kilogram/cubic meter [kg/m^3]',
  units: [
    ['kilogram/cubic meter', 'kg/m^3', 1],
    ['gram/cubic centimeter', 'g/cm^3', 1000],
    ['kilogram/cubic centimeter', 'kg/cm^3', 1e6],
    ['gram/cubic meter', 'g/m^3', 0.001],
    ['gram/cubic millimeter', 'g/mm^3', 1e6],
    ['milligram/cubic meter', 'mg/m^3', 1e-6],
    ['milligram/cubic centimeter', 'mg/cm^3', 1],
    ['milligram/cubic millimeter', 'mg/mm^3', 1000],
    ['exagram/liter', 'Eg/L', 1e18],
    ['petagram/liter', 'Pg/L', 1e15],
    ['teragram/liter', 'Tg/L', 1e12],
    ['gigagram/liter', 'Gg/L', 1e9],
    ['megagram/liter', 'Mg/L', 1e6],
    ['kilogram/liter', 'kg/L', 1000],
    ['hectogram/liter', 'hg/L', 100],
    ['dekagram/liter', 'dag/L', 10],
    ['gram/liter', 'g/L', 1],
    ['decigram/liter', 'dg/L', 0.1],
    ['centigram/liter', 'cg/L', 0.01],
    ['milligram/liter', 'mg/L', 0.001],
    ['microgram/liter', 'µg/L', 1e-6],
    ['nanogram/liter', 'ng/L', 1e-9],
    ['picogram/liter', 'pg/L', 1e-12],
    ['femtogram/liter', 'fg/L', 1e-15],
    ['attogram/liter', 'ag/L', 1e-18],
    ['pound/cubic inch', 'lb/in^3', 27679.904710203],
    ['pound/cubic foot', 'lb/ft^3', 16.018463374],
    ['pound/cubic yard', 'lb/yd^3', 0.5932764213],
    ['pound/gallon (US)', 'lb/gal (US)', 119.8264273167],
    ['pound/gallon (UK)', 'lb/gal (UK)', 99.7763726631],
    ['ounce/cubic inch', 'oz/in^3', 1729.9940443869],
    ['ounce/cubic foot', 'oz/ft^3', 1.0011539609],
    ['ounce/cubic yard', 'oz/yd^3', 0.0370797764],
    ['ounce/gallon (US)', 'oz/gal (US)', 7.4891517073],
    ['ounce/gallon (UK)', 'oz/gal (UK)', 6.2360232914],
    ['grain/gallon (US)', 'gr/gal (US)', 0.0171181279],
    ['grain/gallon (UK)', 'gr/gal (UK)', 0.0142537675],
    ['grain/cubic foot', 'gr/ft^3', 0.0022883519],
    ['ton (short)/cubic yard', '', 1186.552842515],
    ['ton (long)/cubic yard', '', 1328.9391836531],
    ['slug/cubic foot', 'slug/ft^3', 515.3788183932],
    ['psi/1000 feet', '', 2.3066587258],
    ["Earth's density (mean)", '', 5517.9999999999],
  ],
};

export const specificVolume = {
  id: 'specific-volume', name: 'Specific Volume', base: 'cubic meter/kilogram [m^3/kg]',
  units: [
    ['cubic meter/kilogram', 'm^3/kg', 1],
    ['cubic centimeter/gram', 'cm^3/g', 0.001],
    ['liter/kilogram', 'L/kg', 0.001],
    ['liter/gram', 'L/g', 1],
    ['cubic foot/kilogram', 'ft^3/kg', 0.0283168466],
    ['cubic foot/pound', 'ft^3/lb', 0.0624279606],
    ['gallon (US)/pound', 'gal (US)/lb', 0.0083454039],
    ['gallon (UK)/pound', 'gal (UK)/lb', 0.0100224128],
  ],
};

export const momentOfInertia = {
  id: 'moment-of-inertia', name: 'Moment of Inertia', base: 'kilogram square meter',
  units: [
    ['kilogram square meter', 'kg*m^2', 1],
    ['kilogram square centimeter', 'kg*cm^2', 0.0001],
    ['kilogram square millimeter', 'kg*mm^2', 1e-6],
    ['gram square centimeter', 'g*cm^2', 1e-7],
    ['gram square millimeter', 'g*mm^2', 1e-9],
    ['kilogram-force meter square second', '', 9.80665],
    ['kilogram-force centimeter square second', '', 0.0980665],
    ['ounce square inch', 'oz*in^2', 1.829e-5],
    ['ounce-force inch sq. second', '', 0.0070615518],
    ['pound square foot', 'lb*ft^2', 0.0421401101],
    ['pound-force foot sq. second', '', 1.3558179619],
    ['pound square inch', 'lb*in^2', 0.0002926397],
    ['pound-force inch sq. second', '', 0.1129848302],
    ['slug square foot', 'slug*ft^2', 1.3558179619],
  ],
};

export const momentOfForce = {
  id: 'moment-of-force', name: 'Moment of Force', base: 'newton meter [N*m]',
  units: [
    ['newton meter', 'N*m', 1],
    ['kilonewton meter', 'kN*m', 1000],
    ['millinewton meter', 'mN*m', 0.001],
    ['micronewton meter', 'µN*m', 1e-6],
    ['ton-force (short) meter', '', 8896.443230521],
    ['ton-force (long) meter', '', 9964.0164181707],
    ['ton-force (metric) meter', '', 9806.65],
    ['kilogram-force meter', 'kgf*m', 9.80665],
    ['gram-force centimeter', 'gf*cm', 9.80665e-5],
    ['pound-force foot', 'lbf*ft', 1.3558179483],
    ['poundal foot', 'pdl*ft', 0.0421401101],
    ['poundal inch', 'pdl*in', 0.0035116758],
  ],
};

export const torque = {
  id: 'torque', name: 'Torque', base: 'newton meter [N*m]',
  units: [
    ['newton meter', 'N*m', 1],
    ['newton centimeter', 'N*cm', 0.01],
    ['newton millimeter', 'N*mm', 0.001],
    ['kilonewton meter', 'kN*m', 1000],
    ['dyne meter', 'dyn*m', 1e-5],
    ['dyne centimeter', 'dyn*cm', 1e-7],
    ['dyne millimeter', 'dyn*mm', 1e-8],
    ['kilogram-force meter', 'kgf*m', 9.80665],
    ['kilogram-force centimeter', 'kgf*cm', 0.0980665],
    ['kilogram-force millimeter', 'kgf*mm', 0.00980665],
    ['gram-force meter', 'gf*m', 0.00980665],
    ['gram-force centimeter', 'gf*cm', 9.80665e-5],
    ['gram-force millimeter', 'gf*mm', 9.80665e-6],
    ['ounce-force foot', 'ozf*ft', 0.0847386224],
    ['ounce-force inch', 'ozf*in', 0.0070615519],
    ['pound-force foot', 'lbf*ft', 1.3558179483],
    ['pound-force inch', 'lbf*in', 0.1129848163],
  ],
};

export const engineeringGroup = {
  id: 'engineering',
  name: 'Engineering Converters',
  blurb: 'Units used in mechanical and civil engineering work.',
  items: [
    velocity, angularVelocity, acceleration, angularAcceleration, density,
    specificVolume, momentOfInertia, momentOfForce, torque,
  ],
};
