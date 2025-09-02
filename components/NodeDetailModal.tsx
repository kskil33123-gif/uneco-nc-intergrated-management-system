
import React from 'react';
import { Node } from 'reactflow';
import { ProcessNodeData, ProcessStatus } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { STATUS_STYLES } from '../constants';

interface NodeDetailModalProps {
  node: Node<ProcessNodeData>;
  onClose: () => void;
}

const statusText: Record<ProcessStatus, string> = {
    pending: '대기',
    in_progress: '진행 중',
    completed: '완료',
    issue: '이슈 발생',
};

const DetailRow: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="grid grid-cols-3 gap-4 py-2 border-b border-slate-700">
            <dt className="text-sm font-medium text-slate-400">{label}</dt>
            <dd className="text-sm text-slate-200 col-span-2">{value}</dd>
        </div>
    );
};

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, onClose }) => {
  const { data } = node;
  const { icon } = STATUS_STYLES[data.status];

  return (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{data.label}</h2>
                        <div className="flex items-center text-sm mt-1">
                            {icon}
                            <span className="ml-2 text-slate-300">{statusText[data.status]}</span>
                        </div>
                    </div>
                     <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <dl>
                        <DetailRow label="현재 수량" value={data.currentQuantity ? `${data.currentQuantity.toLocaleString()} kg` : 'N/A'} />
                        <DetailRow label="총 수량" value={data.totalQuantity ? `${data.totalQuantity.toLocaleString()} kg` : 'N/A'} />
                        <DetailRow label="담당자" value={data.responsiblePerson} />
                        <DetailRow label="위치" value={data.location} />
                        <DetailRow label="시작 시간" value={data.startTime} />
                        <DetailRow label="완료 시간" value={data.completedTime} />
                        <DetailRow label="참고" value={data.notes} />
                    </dl>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};
