import React from 'react';
import { Store as StoreType } from '../types';
import { MoreHorizontal, Phone, MapPin, User, Building, TrendingUp, ChevronRight } from 'lucide-react';

interface StoreViewProps {
  stores: StoreType[];
  onViewDetail: (storeId: string) => void;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  const labels = {
    active: 'Hoạt động',
    inactive: 'Ngừng',
    maintenance: 'Bảo trì',
  };

  return (
    <span
      className={`px-2.5 py-0.5 xl:px-3 xl:py-1 rounded-full text-xs xl:text-sm font-medium border ${
        styles[status as keyof typeof styles] || styles.inactive
      }`}
    >
      {labels[status as keyof typeof labels] || status}
    </span>
  );
};

export const StoreTableView: React.FC<StoreViewProps> = ({ stores, onViewDetail }) => {
  return (
    <div className="bg-white rounded-xl xl:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs xl:text-sm uppercase text-slate-500 font-bold">
              <th className="px-4 py-3 xl:px-6 xl:py-5">Tên cửa hàng</th>
              <th className="px-4 py-3 xl:px-6 xl:py-5">Địa chỉ</th>
              <th className="px-4 py-3 xl:px-6 xl:py-5">Liên hệ</th>
              <th className="px-4 py-3 xl:px-6 xl:py-5">Quản lý</th>
              <th className="px-4 py-3 xl:px-6 xl:py-5">Trạng thái</th>
              <th className="px-4 py-3 xl:px-6 xl:py-5 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stores.map((store) => (
              <tr 
                key={store.id} 
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(store.id)}
              >
                <td className="px-4 py-3 xl:px-6 xl:py-5">
                  <div className="flex items-center gap-3 xl:gap-4">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-lg xl:rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Building className="w-5 h-5 xl:w-6 xl:h-6"/>
                    </div>
                    <div>
                      <p className="font-semibold text-sm xl:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{store.name}</p>
                      <p className="text-xs xl:text-sm text-slate-500">ID: {store.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 xl:px-6 xl:py-5">
                  <div className="flex items-center gap-2 xl:gap-3 text-slate-600 text-sm xl:text-base max-w-xs truncate">
                    <MapPin className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                </td>
                <td className="px-4 py-3 xl:px-6 xl:py-5">
                  <div className="flex items-center gap-2 xl:gap-3 text-slate-600 text-sm xl:text-base">
                    <Phone className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400" />
                    {store.phone}
                  </div>
                </td>
                <td className="px-4 py-3 xl:px-6 xl:py-5">
                  <div className="flex items-center gap-2 xl:gap-3 text-slate-600 text-sm xl:text-base">
                    <User className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400" />
                    {store.managerName}
                  </div>
                </td>
                <td className="px-4 py-3 xl:px-6 xl:py-5">
                  <StatusBadge status={store.status} />
                </td>
                <td className="px-4 py-3 xl:px-6 xl:py-5 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }} 
                    className="p-2 xl:p-3 hover:bg-white rounded-lg xl:rounded-xl border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-slate-600 transition-all"
                  >
                    <MoreHorizontal className="w-5 h-5 xl:w-6 xl:h-6" />
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

export const StoreCardView: React.FC<StoreViewProps> = ({ stores, onViewDetail }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
      {stores.map((store) => (
        <div
          key={store.id}
          onClick={() => onViewDetail(store.id)}
          className="bg-white rounded-xl xl:rounded-2xl p-5 xl:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 xl:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
          </div>
          
          <div className="flex justify-between items-start mb-4 xl:mb-6">
            <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-xl xl:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-indigo-200 shadow-md">
              <Building className="w-6 h-6 xl:w-8 xl:h-8" />
            </div>
            <div className="flex flex-col items-end gap-2 xl:gap-3">
                 <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-slate-400 hover:text-slate-600 p-1.5 xl:p-2 rounded-full hover:bg-slate-100"
                  >
                    <MoreHorizontal className="w-5 h-5 xl:w-6 xl:h-6" />
                </button>
                <StatusBadge status={store.status} />
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-lg xl:text-xl mb-1 xl:mb-2 group-hover:text-indigo-600 transition-colors">{store.name}</h3>
          <p className="text-slate-500 text-sm xl:text-base mb-4 xl:mb-6 line-clamp-2 h-10 xl:h-12">{store.address}</p>

          <div className="space-y-3 xl:space-y-4 pt-4 xl:pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 xl:gap-4 text-sm xl:text-base text-slate-600">
              <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                 <User className="w-4 h-4 xl:w-5 xl:h-5" />
              </div>
              <span className="font-medium">{store.managerName}</span>
            </div>
            <div className="flex items-center gap-3 xl:gap-4 text-sm xl:text-base text-slate-600">
               <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Phone className="w-4 h-4 xl:w-5 xl:h-5" />
               </div>
              <span>{store.phone}</span>
            </div>
             <div className="flex items-center gap-3 xl:gap-4 text-sm xl:text-base text-indigo-600 font-medium">
               <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <TrendingUp className="w-4 h-4 xl:w-5 xl:h-5" />
               </div>
              <span>Doanh thu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(store.revenue)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};