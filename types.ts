
export type ProcessStatus = 'pending' | 'in_progress' | 'completed' | 'issue';
export type CompanyView = 'uneco' | 'nc_industry';

export interface ProcessNodeData {
  label: string;
  status: ProcessStatus;
  currentQuantity?: number;
  totalQuantity?: number;
  startTime?: string;
  completedTime?: string;
  responsiblePerson?: string;
  location?: string;
  notes?: string;
}

export interface Kpi {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  description: string;
}

export interface Alert {
  id: string;
  type: 'approval' | 'issue' | 'warning';
  message: string;
  timestamp: string;
}
