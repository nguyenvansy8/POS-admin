import React from 'react';
import { PackageOpen, Plus, Utensils, Coffee, ChefHat } from 'lucide-react';

interface ProductEmptyStateProps {
  onCreateClick: () => void;
}

const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
      {/* Illustration Area */}
      <div className="relative mb-8 xl:mb-10 group cursor-pointer" onClick={onCreateClick}>
        {/* Main Circle */}
        <div className="w-32 h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-indigo-50 to-slate-50 rounded-full flex items-center justify-center shadow-inner border border-slate-100">
          <PackageOpen className="w-16 h-16 xl:w-20 xl:h-20 text-slate-300 group-hover:text-indigo-400 transition-colors duration-300" />
        </div>

        {/* Floating Icons */}
        <div className="absolute -top-4 -right-4 bg-white p-3 xl:p-4 rounded-2xl shadow-lg border border-slate-100 animate-bounce delay-100">
          <Utensils className="w-6 h-6 xl:w-8 xl:h-8 text-orange-500" />
        </div>
        <div className="absolute top-1/2 -left-8 bg-white p-3 xl:p-4 rounded-2xl shadow-lg border border-slate-100 animate-bounce delay-300">
          <Coffee className="w-6 h-6 xl:w-8 xl:h-8 text-blue-500" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-3 xl:p-4 rounded-2xl shadow-lg border border-slate-100 animate-bounce delay-500">
          <ChefHat className="w-6 h-6 xl:w-8 xl:h-8 text-emerald-500" />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-2xl xl:text-4xl font-bold text-slate-800 mb-3 xl:mb-4">
        Thực đơn đang trống
      </h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8 xl:mb-10 text-base xl:text-lg leading-relaxed">
        Bạn chưa có món ăn hay đồ uống nào trong hệ thống. Hãy xây dựng thực đơn đầu tiên để bắt đầu bán hàng ngay hôm nay.
      </p>

      {/* CTA Button */}
      <button
        onClick={onCreateClick}
        className="group relative inline-flex items-center gap-3 px-8 py-3.5 xl:px-10 xl:py-5 bg-indigo-600 text-white text-base xl:text-xl font-bold rounded-xl xl:rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all transform hover:-translate-y-1 active:translate-y-0"
      >
        <span className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-90 transition-transform duration-300">
          <Plus className="w-5 h-5 xl:w-7 xl:h-7" />
        </span>
        Thêm món mới ngay
      </button>
    </div>
  );
};

export default ProductEmptyState;