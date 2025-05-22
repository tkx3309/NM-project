
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { priceHistory } from '@/data/mockData';

const PriceChart: React.FC = () => {
  const data = priceHistory.map(item => ({
    year: item.year,
    price: item.price,
    isPrediction: item.year >= new Date().getFullYear()
  }));

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = payload[0].payload.isPrediction;
      
      return (
        <div className="bg-white p-3 shadow-md border rounded-md">
          <p className="font-medium">{`Year: ${label}`}</p>
          <p className="text-primary">{`Price: $${payload[0].value.toLocaleString()}`}</p>
          {isPrediction && (
            <p className="text-xs text-orange-500 mt-1">Forecasted value</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Historical Price Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                padding={{ left: 20, right: 20 }} 
              />
              <YAxis 
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="url(#colorGradient)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
            <span className="text-sm">Historical Data</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-secondary mr-2"></span>
            <span className="text-sm">Forecasted Trend</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
