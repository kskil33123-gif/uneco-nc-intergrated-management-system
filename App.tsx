
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { CompanyView } from './types';

const App: React.FC = () => {
  const [companyView, setCompanyView] = useState<CompanyView>('uneco');

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header currentView={companyView} setView={setCompanyView} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard companyView={companyView} />
      </main>
    </div>
  );
};

export default App;
