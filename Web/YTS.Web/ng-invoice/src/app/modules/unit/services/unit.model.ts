export interface IUnit {
  unitID: string;
  organizationID: string;
  name: string;
  type: number;
}

export class Unit implements IUnit {
  unitID: string;
  organizationID: string;
  name: string;
  type: number;
}

export const UnitType = [
  { key: 0, value: 'None' },
  { key: 1, value: 'NOS (Numbers)' },
  { key: 2, value: 'KGS (Kilograms)' },
  { key: 3, value: 'FT (Feet)' },
  { key: 4, value: 'MTR (Meter)' },
  { key: 5, value: 'PCS (Pieces)' },
  { key: 6, value: 'SQFT (Square Feet)' },
  { key: 7, value: 'IN (Inches)' },
  { key: 8, value: 'LTR (Liters)' },
  { key: 9, value: 'LOT (Lots)' },
  { key: 10, value: 'BAG (Bags)' },
  { key: 11, value: 'SET (Sets)' }
]

export interface ITransferObject {
  isNew: boolean;
  unit: IUnit
}
