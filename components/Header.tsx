
import React from 'react';
import { CompanyView } from '../types';

interface HeaderProps {
  currentView: CompanyView;
  setView: (view: CompanyView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const commonButtonClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500";
  const activeButtonClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveButtonClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <header className="flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700 sticky top-0 z-10 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <svg className="h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
        <h1 className="text-xl font-bold text-white tracking-tight">
          유네코-엔씨산업 통합 관리 시스템
        </h1>
      </div>
      <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg">
        <button
          onClick={() => setView('uneco')}
          className={`${commonButtonClasses} ${currentView === 'uneco' ? activeButtonClasses : inactiveButtonClasses}`}
        >
          유네코
        </button>
        <button
          onClick={() => setView('nc_industry')}
          className={`${commonButtonClasses} ${currentView === 'nc_industry' ? activeButtonClasses : inactiveButtonClasses}`}
        >
          엔씨산업
        </button>
      </div>
    </header>
  );
};
