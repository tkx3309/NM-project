
import { locationFactor, propertyData } from '../data/mockData';

interface PropertyFeatures {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  location: string;
}

export const calculateHousePrice = (features: PropertyFeatures): number => {
  // Base price calculation using a simple regression formula
  const basePrice = 150000;
  
  // Price per square foot factor
  const sqftFactor = 150;
  
  // Age depreciation factor (newer houses are worth more)
  const currentYear = new Date().getFullYear();
  const age = currentYear - features.yearBuilt;
  const ageFactor = Math.max(0.7, 1 - (age * 0.005));
  
  // Bedroom and bathroom premium
  const bedroomValue = features.bedrooms * 15000;
  const bathroomValue = features.bathrooms * 12500;
  
  // Location multiplier
  const locationMultiplier = locationFactor[features.location as keyof typeof locationFactor] || 1;
  
  // Calculate final price
  const calculatedPrice = (
    basePrice +
    (features.squareFeet * sqftFactor) +
    bedroomValue +
    bathroomValue
  ) * ageFactor * locationMultiplier;
  
  // Add some randomness for realistic variation (±5%)
  const randomFactor = 0.95 + (Math.random() * 0.1);
  
  return Math.round(calculatedPrice * randomFactor);
};

export const findSimilarProperties = (features: PropertyFeatures, count: number = 3) => {
  return propertyData
    .map(property => {
      // Calculate similarity score (lower is more similar)
      const sizeDiff = Math.abs(property.squareFeet - features.squareFeet) / 500;
      const bedroomDiff = Math.abs(property.bedrooms - features.bedrooms);
      const bathroomDiff = Math.abs(property.bathrooms - features.bathrooms);
      const ageDiff = Math.abs(property.yearBuilt - features.yearBuilt) / 10;
      const locationMatch = property.location === features.location ? 0 : 1;
      
      const similarityScore = sizeDiff + bedroomDiff + bathroomDiff + ageDiff + locationMatch;
      
      return {
        ...property,
        similarityScore
      };
    })
    .sort((a, b) => a.similarityScore - b.similarityScore)
    .slice(0, count);
};

export const getPriceRange = (estimatedPrice: number): { min: number; max: number } => {
  const variation = estimatedPrice * 0.1; // 10% variation
  return {
    min: Math.round(estimatedPrice - variation),
    max: Math.round(estimatedPrice + variation)
  };
};

export const formatCurrency = (value: number): string => {
  // Convert USD to INR (approximate conversion rate)
  const inrValue = value * 83;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrValue);
};
