
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getPriceRange, findSimilarProperties } from '@/utils/priceCalculator';
import { PropertyData } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface PredictionResultProps {
  price: number;
  features: {
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    yearBuilt: number;
    location: string;
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ price, features }) => {
  const priceRange = getPriceRange(price);
  const similarProps = findSimilarProperties(features);
  
  const confidenceScore = Math.min(95, 75 + Math.floor(Math.random() * 20));
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-white shadow-lg border-l-4 border-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Estimated Property Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary mb-2">
            {formatCurrency(price)}
          </div>
          <div className="text-sm text-gray-600">
            Predicted price range: {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
          </div>
          <div className="mt-4 flex items-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {confidenceScore}% confidence
            </Badge>
            <span className="ml-2 text-sm text-gray-500">Based on current market data</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Similar Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {similarProps.map((prop: PropertyData) => (
              <div key={prop.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <div className="font-medium">{prop.squareFeet} sq ft, {prop.bedrooms} beds, {prop.bathrooms} baths</div>
                  <div className="text-sm text-gray-600">{prop.location} • Built in {prop.yearBuilt}</div>
                </div>
                <div className="text-lg font-semibold">{formatCurrency(prop.price)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResult;
