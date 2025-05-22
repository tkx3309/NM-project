
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">House Price Oracle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Using advanced data science techniques to predict property values with precision.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Resources</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-primary">Market Reports</a></li>
              <li><a href="#" className="hover:text-primary">Methodology</a></li>
              <li><a href="#" className="hover:text-primary">Data Sources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For more information about our prediction models, please contact us.
            </p>
            <a href="#" className="inline-block mt-2 text-primary hover:underline">support@housepriceoracle.com</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} House Price Oracle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
