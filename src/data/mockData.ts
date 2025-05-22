
export interface PropertyData {
  id: number;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  location: string;
  price: number;
}

export const propertyData: PropertyData[] = [
  { id: 1, squareFeet: 1500, bedrooms: 3, bathrooms: 2, yearBuilt: 2005, location: 'Urban', price: 320000 },
  { id: 2, squareFeet: 2200, bedrooms: 4, bathrooms: 3, yearBuilt: 2010, location: 'Suburban', price: 450000 },
  { id: 3, squareFeet: 1800, bedrooms: 3, bathrooms: 2.5, yearBuilt: 2008, location: 'Urban', price: 380000 },
  { id: 4, squareFeet: 3000, bedrooms: 5, bathrooms: 3.5, yearBuilt: 2015, location: 'Suburban', price: 620000 },
  { id: 5, squareFeet: 1200, bedrooms: 2, bathrooms: 1, yearBuilt: 1985, location: 'Urban', price: 250000 },
  { id: 6, squareFeet: 2500, bedrooms: 4, bathrooms: 2.5, yearBuilt: 2012, location: 'Rural', price: 470000 },
  { id: 7, squareFeet: 1600, bedrooms: 3, bathrooms: 2, yearBuilt: 2000, location: 'Suburban', price: 350000 },
  { id: 8, squareFeet: 3200, bedrooms: 5, bathrooms: 4, yearBuilt: 2018, location: 'Rural', price: 680000 },
  { id: 9, squareFeet: 1400, bedrooms: 2, bathrooms: 2, yearBuilt: 1995, location: 'Urban', price: 290000 },
  { id: 10, squareFeet: 2800, bedrooms: 4, bathrooms: 3, yearBuilt: 2014, location: 'Suburban', price: 530000 },
];

export const priceHistory = [
  { year: 2018, price: 280000 },
  { year: 2019, price: 295000 },
  { year: 2020, price: 305000 },
  { year: 2021, price: 330000 },
  { year: 2022, price: 360000 },
  { year: 2023, price: 390000 },
  { year: 2024, price: 410000 },
  { year: 2025, price: 435000 }, // Prediction
];

export const locationFactor = {
  'Urban': 1.2,
  'Suburban': 1.0,
  'Rural': 0.9,
};

export const similarProperties = [
  { address: '123 Market St', price: 389000, squareFeet: 1750, bedrooms: 3, bathrooms: 2 },
  { address: '456 Park Ave', price: 412000, squareFeet: 1800, bedrooms: 3, bathrooms: 2.5 },
  { address: '789 Main St', price: 375000, squareFeet: 1650, bedrooms: 3, bathrooms: 2 },
];
