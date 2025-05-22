
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HousePriceForm from '@/components/HousePriceForm';
import PredictionResult from '@/components/PredictionResult';
import PropertyFeatures from '@/components/PropertyFeatures';
import PriceChart from '@/components/PriceChart';
import { Building2, TrendingUp, HandCoins, BarChart3 } from 'lucide-react';

interface Prediction {
  price: number;
  features: {
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    yearBuilt: number;
    location: string;
  };
}

const Index = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const handlePrediction = (data: Prediction) => {
    setPrediction(data);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Predict Your Home's Value</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Smart regression models powered by data science to forecast house prices with precision.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: <Building2 size={24} />, text: "Property Analysis" },
                  { icon: <TrendingUp size={24} />, text: "Market Trends" },
                  { icon: <HandCoins size={24} />, text: "Price Comparison" },
                  { icon: <BarChart3 size={24} />, text: "Data Visualization" }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <HousePriceForm onPrediction={handlePrediction} />
            
            {prediction && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Price Analysis</h2>
                
                <PropertyFeatures features={prediction.features} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <PredictionResult 
                    price={prediction.price} 
                    features={prediction.features}
                  />
                  <div>
                    <PriceChart />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Method Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Forecasting Methodology</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Using advanced regression techniques, our model analyzes multiple property features to predict market value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Property Analysis",
                  description: "We analyze property features like square footage, bedrooms, bathrooms, and age."
                },
                {
                  title: "Location Intelligence",
                  description: "Location has a significant impact on property values. Our model accounts for different location types."
                },
                {
                  title: "Market Trends",
                  description: "Historical data and market trends are integrated to improve prediction accuracy."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
