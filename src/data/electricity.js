export const charge = {
  id: 'charge', name: 'Charge', base: 'coulomb [C]',
  units: [
    ['coulomb', 'C', 1],
    ['megacoulomb', 'MC', 1e6],
    ['kilocoulomb', 'kC', 1000],
    ['millicoulomb', 'mC', 0.001],
    ['microcoulomb', 'µC', 1e-6],
    ['nanocoulomb', 'nC', 1e-9],
    ['picocoulomb', 'pC', 1e-12],
    ['abcoulomb', 'abC', 10],
    ['EMU of charge', '', 10],
    ['statcoulomb', 'stC', 3.335640951982e-10],
    ['ESU of charge', '', 3.335640951982e-10],
    ['franklin', 'Fr', 3.335640951982e-10],
    ['ampere-hour', 'A*h', 3600],
    ['ampere-minute', 'A*min', 60],
    ['ampere-second', 'A*s', 1],
    ['faraday (based on carbon 12)', '', 96485.309000004],
    ['Elementary charge', 'e', 1.60217733e-19],
  ],
};

export const linearChargeDensity = {
  id: 'linear-charge-density', name: 'Linear Charge Density', base: 'coulomb/meter [C/m]',
  units: [
    ['coulomb/meter', 'C/m', 1],
    ['coulomb/centimeter', 'C/cm', 100],
    ['coulomb/inch', 'C/in', 39.3700787402],
    ['abcoulomb/meter', 'abC/m', 10],
    ['abcoulomb/centimeter', 'abC/cm', 1000],
    ['abcoulomb/inch', 'abC/in', 393.7007874016],
  ],
};

export const surfaceChargeDensity = {
  id: 'surface-charge-density', name: 'Surface Charge Density', base: 'coulomb/square meter',
  units: [
    ['coulomb/square meter', 'C/m^2', 1],
    ['coulomb/square centimeter', 'C/cm^2', 10000],
    ['coulomb/square inch', 'C/in^2', 1550.0031000062],
    ['abcoulomb/square meter', 'abC/m^2', 10],
    ['abcoulomb/square centimeter', 'abC/cm^2', 100000],
    ['abcoulomb/square inch', 'abC/in^2', 15500.031000062],
  ],
};

export const volumeChargeDensity = {
  id: 'volume-charge-density', name: 'Volume Charge Density', base: 'coulomb/cubic meter',
  units: [
    ['coulomb/cubic meter', 'C/m^3', 1],
    ['coulomb/cubic centimeter', 'C/cm^3', 1e6],
    ['coulomb/cubic inch', 'C/in^3', 61023.744094732],
    ['abcoulomb/cubic meter', 'abC/m^3', 10],
    ['abcoulomb/cubic centimeter', 'abC/cm^3', 1e7],
    ['abcoulomb/cubic inch', 'abC/in^3', 610237.44094732],
  ],
};

export const current = {
  id: 'current', name: 'Current', base: 'ampere [A]',
  units: [
    ['ampere', 'A', 1],
    ['kiloampere', 'kA', 1000],
    ['milliampere', 'mA', 0.001],
    ['biot', 'Bi', 10],
    ['abampere', 'abA', 10],
    ['EMU of current', '', 10],
    ['statampere', 'stA', 3.335641e-10],
    ['ESU of current', '', 3.335641e-10],
    ['CGS e.m. unit', '', 10],
    ['CGS e.s. unit', '', 3.335641e-10],
  ],
};

export const linearCurrentDensity = {
  id: 'linear-current-density', name: 'Linear Current Density', base: 'ampere/meter [A/m]',
  units: [
    ['ampere/meter', 'A/m', 1],
    ['ampere/centimeter', 'A/cm', 100],
    ['ampere/inch', 'A/in', 39.3700787402],
    ['abampere/meter', 'abA/m', 10],
    ['abampere/centimeter', 'abA/cm', 1000],
    ['abampere/inch', 'abA/in', 393.7007874016],
    ['oersted', 'Oe', 79.5774715482],
    ['gilbert/centimeter', 'Gb/cm', 79.5774715482],
  ],
};

export const surfaceCurrentDensity = {
  id: 'surface-current-density', name: 'Surface Current Density', base: 'ampere/square meter',
  units: [
    ['ampere/square meter', 'A/m^2', 1],
    ['ampere/square centimeter', 'A/cm^2', 10000],
    ['ampere/square inch', 'A/in^2', 1550.0031000062],
    ['ampere/square mil', 'A/mil^2', 1550003100.0062],
    ['ampere/circular mil', '', 1973525240.9908],
    ['abampere/square centimeter', 'abA/cm^2', 100000],
  ],
};

export const electricFieldStrength = {
  id: 'electric-field-strength', name: 'Electric Field Strength', base: 'volt/meter [V/m]',
  units: [
    ['volt/meter', 'V/m', 1],
    ['kilovolt/meter', 'kV/m', 1000],
    ['kilovolt/centimeter', 'kV/cm', 100000],
    ['volt/centimeter', 'V/cm', 100],
    ['millivolt/meter', 'mV/m', 0.001],
    ['microvolt/meter', 'µV/m', 1e-6],
    ['kilovolt/inch', 'kV/in', 39370.078740157],
    ['volt/inch', 'V/in', 39.3700787402],
    ['volt/mil', 'V/mil', 39370.078740157],
    ['abvolt/centimeter', 'abV/cm', 1e-6],
    ['statvolt/centimeter', 'stV/cm', 29979.19999934],
    ['statvolt/inch', 'stV/in', 11802.834645298],
    ['newton/coulomb', 'N/C', 1],
  ],
};

export const electricPotential = {
  id: 'electric-potential', name: 'Electric Potential', base: 'volt [V]',
  units: [
    ['volt', 'V', 1],
    ['watt/ampere', 'W/A', 1],
    ['abvolt', 'abV', 1e-8],
    ['EMU of electric potential', '', 1e-8],
    ['statvolt', 'stV', 299.7924999996],
    ['ESU of electric potential', '', 299.7924999996],
    ['megavolt', 'MV', 1e6],
    ['kilovolt', 'kV', 1000],
    ['millivolt', 'mV', 0.001],
    ['microvolt', 'µV', 1e-6],
    ['nanovolt', 'nV', 1e-9],
    ['picovolt', 'pV', 1e-12],
  ],
};

export const electricResistance = {
  id: 'electric-resistance', name: 'Electric Resistance', base: 'ohm',
  units: [
    ['ohm', 'ohm', 1],
    ['megohm', 'Mohm', 1e6],
    ['kilohm', 'kohm', 1000],
    ['milliohm', 'mohm', 0.001],
    ['microhm', 'µohm', 1e-6],
    ['volt/ampere', 'V/A', 1],
    ['reciprocal siemens', '1/S', 1],
    ['abohm', 'abohm', 1e-9],
    ['EMU of resistance', '', 1e-9],
    ['statohm', 'stohm', 898755200000],
    ['ESU of resistance', '', 898755200000],
    ['Quantized Hall resistance', '', 25812.8056],
  ],
};

export const electricResistivity = {
  id: 'electric-resistivity', name: 'Electric Resistivity', base: 'ohm meter',
  units: [
    ['ohm meter', 'ohm*m', 1],
    ['ohm centimeter', 'ohm*cm', 0.01],
    ['ohm inch', 'ohm*in', 0.0254],
    ['microhm centimeter', '', 1e-8],
    ['microhm inch', '', 2.54e-8],
    ['abohm centimeter', '', 1e-11],
    ['statohm centimeter', '', 8987552000],
    ['circular mil ohm/foot', '', 1.6624261398e-9],
  ],
};

export const electricConductance = {
  id: 'electric-conductance', name: 'Electric Conductance', base: 'siemens [S]',
  units: [
    ['siemens', 'S', 1],
    ['megasiemens', 'MS', 1e6],
    ['kilosiemens', 'kS', 1000],
    ['millisiemens', 'mS', 0.001],
    ['microsiemens', 'µS', 1e-6],
    ['ampere/volt', 'A/V', 1],
    ['mho', '', 1],
    ['gemmho', '', 1e-6],
    ['micromho', '', 1e-6],
    ['abmho', '', 1e9],
    ['statmho', '', 1.1126534560019e-12],
  ],
};

export const electricConductivity = {
  id: 'electric-conductivity', name: 'Electric Conductivity', base: 'siemens/meter [S/m]',
  units: [
    ['siemens/meter', 'S/m', 1],
    ['siemens/centimeter', 'S/cm', 100],
    ['picosiemens/meter', 'pS/m', 1e-12],
    ['mho/meter', '', 1],
    ['mho/centimeter', '', 100],
    ['abmho/meter', '', 1e9],
    ['abmho/centimeter', '', 1e11],
    ['statmho/meter', '', 1.1126534560019e-12],
    ['statmho/centimeter', '', 1.1126534560019e-10],
  ],
};

export const capacitance = {
  id: 'electrostatic-capacitance', name: 'Electrostatic Capacitance', base: 'farad [F]',
  units: [
    ['farad', 'F', 1],
    ['exafarad', 'EF', 1e18],
    ['petafarad', 'PF', 1e15],
    ['terafarad', 'TF', 1e12],
    ['gigafarad', 'GF', 1e9],
    ['megafarad', 'MF', 1e6],
    ['kilofarad', 'kF', 1000],
    ['hectofarad', 'hF', 100],
    ['dekafarad', 'daF', 10],
    ['decifarad', 'dF', 0.1],
    ['centifarad', 'cF', 0.01],
    ['millifarad', 'mF', 0.001],
    ['microfarad', 'µF', 1e-6],
    ['nanofarad', 'nF', 1e-9],
    ['picofarad', 'pF', 1e-12],
    ['femtofarad', 'fF', 1e-15],
    ['attofarad', 'aF', 1e-18],
    ['coulomb/volt', 'C/V', 1],
    ['abfarad', 'abF', 1e9],
    ['EMU of capacitance', '', 1e9],
    ['statfarad', 'stF', 1.112650056e-12],
    ['ESU of capacitance', '', 1.112650056e-12],
  ],
};

export const inductance = {
  id: 'inductance', name: 'Inductance', base: 'henry [H]',
  units: [
    ['henry', 'H', 1],
    ['exahenry', 'EH', 1e18],
    ['petahenry', 'PH', 1e15],
    ['terahenry', 'TH', 1e12],
    ['gigahenry', 'GH', 1e9],
    ['megahenry', 'MH', 1e6],
    ['kilohenry', 'kH', 1000],
    ['hectohenry', 'hH', 100],
    ['dekahenry', 'daH', 10],
    ['decihenry', 'dH', 0.1],
    ['centihenry', 'cH', 0.01],
    ['millihenry', 'mH', 0.001],
    ['microhenry', 'µH', 1e-6],
    ['nanohenry', 'nH', 1e-9],
    ['picohenry', 'pH', 1e-12],
    ['femtohenry', 'fH', 1e-15],
    ['attohenry', 'aH', 1e-18],
    ['weber/ampere', 'Wb/A', 1],
    ['abhenry', 'abH', 1e-9],
    ['EMU of inductance', '', 1e-9],
    ['stathenry', 'stH', 898755200000],
    ['ESU of inductance', '', 898755200000],
  ],
};

export const electricityGroup = {
  id: 'electricity',
  name: 'Electricity Converters',
  blurb: 'Charge, current, voltage and circuit units.',
  items: [
    charge, linearChargeDensity, surfaceChargeDensity, volumeChargeDensity,
    current, linearCurrentDensity, surfaceCurrentDensity, electricFieldStrength,
    electricPotential, electricResistance, electricResistivity,
    electricConductance, electricConductivity, capacitance, inductance,
  ],
};
