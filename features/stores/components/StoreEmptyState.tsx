import React from 'react';
import { Store as StoreIcon, Plus } from 'lucide-react';

interface StoreEmptyStateProps {
  onCreateClick: () => void;
}

const StoreEmptyState: React.FC<StoreEmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 relative group">
        <StoreIcon className="w-12 h-12 text-slate-400 group-hover:text-indigo-500 transition-colors duration-300" />
        <div className="absolute -bottom-2 -right-2 bg-indigo-100 p-2 rounded-full border-4 border-white">
          <Plus className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có cửa hàng nào</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Hệ thống chưa ghi nhận dữ liệu cửa hàng. Hãy bắt đầu bằng cách tạo cửa hàng đầu tiên của bạn để quản lý doanh thu và sản phẩm.
      </p>
      
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Thêm cửa hàng mới</span>
      </button>
    </div>
  );
};

export default StoreEmptyState;