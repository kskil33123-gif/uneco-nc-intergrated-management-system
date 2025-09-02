
import React from 'react';
import { KpiCard } from './KpiCard';
import { AlertCenter } from './AlertCenter';
import FlowDiagram from './FlowDiagram';
import { CompanyView, Alert } from '../types';
import { UNECO_KPIS, NC_INDUSTRY_KPIS, MOCK_ALERTS } from '../constants';
import { useProcessData } from '../hooks/useProcessData';
import { motion } from 'framer-motion';

interface DashboardProps {
  companyView: CompanyView;
}

export const Dashboard: React.FC<DashboardProps> = ({ companyView }) => {
  const { nodes, setNodes, edges, setEdges, confirmStep, startShippingProcess } = useProcessData();
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

  const productStorageNode = nodes.find(n => n.id === '5');
  const shippingNode = nodes.find(n => n.id === '6');

  const alerts: Alert[] = [...MOCK_ALERTS];

  if (productStorageNode?.data.status === 'completed' && shippingNode?.data.status === 'pending') {
    alerts.unshift({
      id: 'new-order-alert',
      type: 'approval',
      message: '유네코 신규 발주. 출고를 준비하세요.',
      timestamp: '방금',
      action: startShippingProcess,
      actionLabel: '출고 준비'
    });
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="h-[40vh] md:h-[45vh] lg:h-[50vh] bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FlowDiagram 
            nodes={nodes} 
            setNodes={setNodes} 
            edges={edges} 
            setEdges={setEdges}
            onConfirmStep={confirmStep}
        />
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
            <AlertCenter alerts={alerts} />
        </motion.div>
      </div>
    </div>
  );
};