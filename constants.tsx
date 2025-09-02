
import React from 'react';
import { ProcessStatus, Kpi, Alert } from './types';
import { Edge, Node } from 'reactflow';
import { ProcessNodeData } from './types';


export const STATUS_STYLES: Record<ProcessStatus, { icon: JSX.Element, color: string, pulse: boolean }> = {
  pending: {
    icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
    color: 'border-yellow-500/50 bg-yellow-900/30',
    pulse: false,
  },
  in_progress: {
    icon: <SpinnerIcon className="h-5 w-5 text-blue-400" />,
    color: 'border-blue-500 bg-blue-900/30',
    pulse: true,
  },
  completed: {
    icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    color: 'border-green-500/50 bg-green-900/30',
    pulse: false,
  },
  issue: {
    icon: <WarningIcon className="h-5 w-5 text-red-400" />,
    color: 'border-red-500 bg-red-900/30',
    pulse: false,
  },
};

export const INITIAL_NODES: Node<ProcessNodeData>[] = [
    { id: '1', type: 'custom', position: { x: 50, y: 150 }, data: { label: '유네코 원료 출고', status: 'completed', currentQuantity: 50000, totalQuantity: 50000, responsiblePerson: '김유신', location: '유네코 제1공장' } },
    { id: '2', type: 'custom', position: { x: 300, y: 150 }, data: { label: '엔씨산업 입고', status: 'in_progress', currentQuantity: 49850, totalQuantity: 50000, responsiblePerson: '이순신', location: '엔씨산업 입고장', requiresManualConfirmation: true, confirmationLabel: '입고 확인' } },
    { id: '3', type: 'custom', position: { x: 550, y: 150 }, data: { label: '야적장 보관', status: 'pending' } },
    { id: '4', type: 'custom', position: { x: 800, y: 150 }, data: { label: '설비 투입/선별', status: 'pending' } },
    { id: '5', type: 'custom', position: { x: 1050, y: 150 }, data: { label: '완제품 보관', status: 'pending' } },
    { id: '6', type: 'custom', position: { x: 1300, y: 150 }, data: { label: '제품 출고', status: 'pending', requiresManualConfirmation: true, confirmationLabel: '최종 출고 승인' } },
];

export const INITIAL_EDGES: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', style: { stroke: '#6b7280', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', style: { stroke: '#6b7280', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#6b7280', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', style: { stroke: '#6b7280', strokeWidth: 2 } },
];

export const MOCK_ALERTS: Alert[] = [
    { id: '1', type: 'approval', message: '출고 No. 2024-07-29A 승인 대기 중', timestamp: '2분 전' },
    { id: '2', type: 'issue', message: '입고 중량 1.5% 오차 발생 (ID: B-123)', timestamp: '15분 전' },
    { id: '3', type: 'warning', message: '0.4~1.0mm 제품 재고 부족 경고', timestamp: '1시간 전' },
];

export const UNECO_KPIS: Kpi[] = [
    { title: '원료 출고량 (금일)', value: '125.4 T', change: '+5.2%', changeType: 'increase', description: '일일 목표 대비 110% 달성' },
    { title: '완제품 총 재고', value: '2,480 T', description: '모든 사이즈 제품 포함' },
    { title: '엔씨산업 작업률', value: '85%', change: '-2%', changeType: 'decrease', description: '평균 대비 소폭 하락' },
    { title: '부산물 발생량', value: '3.1 T', description: 'Oversize 및 분진' },
];

export const NC_INDUSTRY_KPIS: Kpi[] = [
    { title: '금일 처리량', value: '89.7 T', change: '+8.1%', changeType: 'increase', description: '최근 7일 평균 대비' },
    { title: '설비 가동률', value: '92%', description: '주간 목표 90%' },
    { title: '입고 대기 원료', value: '50 T', description: '차량 2대 분량' },
    { title: '출고 예정 (금일)', value: '35 T', description: '총 3건' },
];


// --- ICON COMPONENTS (defined here for reusability) ---

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

export function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className={`animate-spin ${props.className || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.696a8.25 8.25 0 010 11.667m-11.667 0a8.25 8.25 0 010-11.667M12 6.75v-1.5m0 15v-1.5m-8.25-8.25H2.25m19.5 0h-1.5M12 2.25V.75m0 22.5v-1.5m-8.25-1.5h-1.5m19.5 0h-1.5" />
      </svg>
    );
  }

export function BellIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
    );
}

export function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-9-4.5H3.375a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H12.75z" />
    </svg>
  );
}