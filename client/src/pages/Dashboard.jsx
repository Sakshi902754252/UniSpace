import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/WelcomeBanner';
import Banner2 from '../partials/Banner2';
import Banner3 from '../partials/Banner3';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load the first chatbot script dynamically
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Load the second chatbot script dynamically
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/07/18/20250107180147-44QZYXE4.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      // Cleanup scripts on component unmount
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            <Banner2 />
            <Banner3 />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Hero section */}
            </div>
          </div>
        </main>
      </div>

      {/* Chatbot container */}
      <div className="fixed bottom-4 right-4">
        {/* Chatbot will mount automatically here via scripts */}
      </div>
    </div>
  );
}

export default Dashboard;
