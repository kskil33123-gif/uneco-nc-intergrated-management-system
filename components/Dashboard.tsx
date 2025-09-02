
import React from 'react';
import { KpiCard } from './KpiCard';
import { AlertCenter } from './AlertCenter';
import FlowDiagram from './FlowDiagram';
import { CompanyView } from '../types';
import { UNECO_KPIS, NC_INDUSTRY_KPIS, MOCK_ALERTS } from '../constants';
import { useProcessData } from '../hooks/useProcessData';
import { motion } from 'framer-motion';

interface DashboardProps {
  companyView: CompanyView;
}

export const Dashboard: React.FC<DashboardProps> = ({ companyView }) => {
  const { nodes, setNodes, edges, setEdges } = useProcessData();
  const kpis = companyView === 'uneco' ? UNECO_KPIS : NC_INDUSTRY_KPIS;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="h-[40vh] md:h-[45vh] lg:h-[50vh] bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FlowDiagram nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {kpis.map((kpi, index) => (
            <motion.div key={index} variants={itemVariants}>
                <KpiCard {...kpi} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
        >
            <AlertCenter alerts={MOCK_ALERTS} />
        </motion.div>
      </div>
    </div>
  );
};
