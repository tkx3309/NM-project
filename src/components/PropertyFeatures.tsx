
import React from 'react';
import { Card } from "@/components/ui/card";
import { Home, Ruler, Calendar, MapPin } from 'lucide-react';

interface PropertyFeaturesProps {
  features: {
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    yearBuilt: number;
    location: string;
  };
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  const featureItems = [
    {
      icon: <Ruler className="h-5 w-5 text-primary" />,
      label: "Square Feet",
      value: `${features.squareFeet.toLocaleString()} sq ft`
    },
    {
      icon: <Home className="h-5 w-5 text-primary" />,
      label: "Bedrooms & Bathrooms",
      value: `${features.bedrooms} beds, ${features.bathrooms} baths`
    },
    {
      icon: <Calendar className="h-5 w-5 text-primary" />,
      label: "Year Built",
      value: features.yearBuilt
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      label: "Location",
      value: features.location
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {featureItems.map((item, index) => (
        <Card key={index} className="p-4 feature-card">
          <div className="flex items-start space-x-3">
            <div className="mt-1">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PropertyFeatures;
