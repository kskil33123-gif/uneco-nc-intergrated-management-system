
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { CompanyView } from './types';
import { useAuthState } from './hooks/useAuthState';
import { Login } from './components/Login';
import { auth } from './firebase/config';
// FIX: Removed modular import for signOut, as it is not available in Firebase v8/compat mode.
// import { signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [companyView, setCompanyView] = useState<CompanyView>('uneco');
  const { user, loading } = useAuthState();

  const handleLogout = () => {
    // FIX: Switched to v8/compat syntax for signing out.
    auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header 
            currentView={companyView} 
            setView={setCompanyView}
            userEmail={user.email}
            onLogout={handleLogout}
          />
          <main className="p-4 sm:p-6 lg:p-8">
            <Dashboard companyView={companyView} />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
