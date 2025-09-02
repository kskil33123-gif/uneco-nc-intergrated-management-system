
import React from 'react';
import { Kpi } from '../types';

export const KpiCard: React.FC<Kpi> = ({ title, value, change, changeType, description }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = changeType ? (isIncrease ? 'text-green-400' : 'text-red-400') : 'text-gray-400';

  return (
    <div className="bg-slate-800/50 p-5 rounded-xl shadow-lg border border-slate-700 h-full flex flex-col justify-between hover:border-indigo-500/50 transition-colors duration-300">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <p className="text-3xl font-semibold text-white">{value}</p>
          {change && (
            <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
              {isIncrease ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">{description}</p>
    </div>
  );
};