import { ViewMode } from '../../types/shared';

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  managerName: string;
  status: 'active' | 'inactive' | 'maintenance';
  image?: string;
  revenue: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  managerName: string;
  status: 'active' | 'inactive';
}

export interface StoreFormData {
  name: string;
  address: string;
  phone: string;
  managerName: string;
}

export interface BranchFormData {
  name: string;
  code: string;
  address: string;
  phone: string;
  managerName: string;
}

export type { ViewMode };