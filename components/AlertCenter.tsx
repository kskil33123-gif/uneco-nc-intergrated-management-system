
import React from 'react';
import { Alert } from '../types';
import { BellIcon, CheckCircleIcon, WarningIcon } from '../constants';
import { motion } from 'framer-motion';

const alertIcons: Record<Alert['type'], JSX.Element> = {
    approval: <CheckCircleIcon className="h-5 w-5 text-blue-400" />,
    issue: <WarningIcon className="h-5 w-5 text-red-400" />,
    warning: <WarningIcon className="h-5 w-5 text-yellow-400" />,
};

export const AlertCenter: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  return (
    <div className="bg-slate-800/50 p-5 rounded-xl shadow-lg border border-slate-700 h-full">
      <div className="flex items-center mb-4">
        <BellIcon className="h-6 w-6 text-indigo-400 mr-3" />
        <h3 className="font-bold text-lg text-white">알림 센터</h3>
      </div>
      <ul className="space-y-3">
        {alerts.map(alert => (
          <motion.li 
            key={alert.id} 
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-700/50 transition-colors duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            <div className="flex-shrink-0 pt-0.5">{alertIcons[alert.type]}</div>
            <div className="flex-grow">
              <p className="text-sm text-slate-200">{alert.message}</p>
              <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
               {alert.action && alert.actionLabel && (
                <button
                    onClick={alert.action}
                    className="mt-2 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
                >
                    {alert.actionLabel}
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};