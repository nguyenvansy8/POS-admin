import React from 'react';
import { Branch } from '../types';
import { MoreHorizontal, GitBranch, MapPin, Phone, User, Hash } from 'lucide-react';

interface BranchViewProps {
  branches: Branch[];
}

export const BranchTableView: React.FC<BranchViewProps> = ({ branches }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <th className="px-6 py-4 w-32">Mã CN</th>
              <th className="px-6 py-4">Tên chi nhánh</th>
              <th className="px-6 py-4">Địa chỉ</th>
              <th className="px-6 py-4">Quản lý</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((branch) => (
              <tr key={branch.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-slate-500">{branch.code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-900">{branch.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {branch.address}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-medium text-indigo-600 border border-indigo-100">
                      {branch.managerName.charAt(0)}
                    </div>
                    {branch.managerName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    branch.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {branch.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const BranchCardView: React.FC<BranchViewProps> = ({ branches }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {branches.map((branch) => (
        <div key={branch.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{branch.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 bg-slate-100 px-2 py-0.5 rounded w-fit">
                  <Hash className="w-3 h-3" />
                  {branch.code}
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50">
                <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 mb-4">
             <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{branch.address}</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{branch.phone}</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
                <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{branch.managerName}</span>
             </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                branch.status === 'active' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {branch.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
             </span>
             <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Chi tiết
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};