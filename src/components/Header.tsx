import React, { useState } from 'react';
import { Bot, IndianRupee, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIPricePredictionDialog = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAIPrediction = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    setIsLoading(true);
    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    try {
      // Simulated AI prediction (replace with actual API call in future)
      const aiResponse = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve("Based on current market trends and your requirements, I predict a potential price range of ₹75,00,000 to ₹85,00,000 for similar properties in this area. This estimate takes into account factors like location, size, and recent market activity.");
        }, 1500);
      });
      
      const newAiMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      toast.error("Failed to generate AI prediction", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAIPrediction(inputMessage);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-white/10 hover:bg-white/20"
        >
          <Bot className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>House Price Oracle AI</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Ask me about house prices and market predictions!
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'assistant'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-primary text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about house prices..."
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  return (
    <header className="py-6 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold">House Price Oracle</h1>
            <p className="text-sm md:text-base opacity-90">Advanced forecasting using data science</p>
          </div>
          <div className="flex items-center space-x-4">
            <AIPricePredictionDialog />
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              <div>
                <span className="text-xs font-medium block">POWERED BY</span>
                <span className="font-semibold">Smart Regression AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
