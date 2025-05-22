
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { calculateHousePrice } from '@/utils/priceCalculator';

interface HousePriceFormProps {
  onPrediction: (prediction: {
    price: number;
    features: {
      squareFeet: number;
      bedrooms: number;
      bathrooms: number;
      yearBuilt: number;
      location: string;
    }
  }) => void;
}

const HousePriceForm: React.FC<HousePriceFormProps> = ({ onPrediction }) => {
  const currentYear = new Date().getFullYear();
  const [formState, setFormState] = useState({
    squareFeet: 1800,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    location: 'Urban',
  });

  const handleChange = (field: string, value: number | string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = calculateHousePrice(formState);
    onPrediction({
      price,
      features: formState
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="squareFeet">Square Footage: {formState.squareFeet} sq ft</Label>
              <Slider 
                id="squareFeet"
                min={500} 
                max={5000} 
                step={50}
                value={[formState.squareFeet]} 
                onValueChange={(value) => handleChange('squareFeet', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built: {formState.yearBuilt}</Label>
              <Slider 
                id="yearBuilt"
                min={1950} 
                max={currentYear} 
                step={1}
                value={[formState.yearBuilt]} 
                onValueChange={(value) => handleChange('yearBuilt', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select 
                value={formState.bedrooms.toString()} 
                onValueChange={(value) => handleChange('bedrooms', parseInt(value))}
              >
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select 
                value={formState.bathrooms.toString()} 
                onValueChange={(value) => handleChange('bathrooms', parseFloat(value))}
              >
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location Type</Label>
              <Select 
                value={formState.location} 
                onValueChange={(value) => handleChange('location', value)}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Suburban">Suburban</SelectItem>
                  <SelectItem value="Rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6">
            <Button type="submit" className="w-full gradient-bg">
              Generate Price Forecast
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default HousePriceForm;
