import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Tổng doanh thu', value: '1.2 tỷ', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Đơn hàng', value: '1,240', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Khách hàng mới', value: '320', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Tăng trưởng', value: '+12.5%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="p-4 md:p-6 xl:p-10">
      <h1 className="text-2xl xl:text-3xl font-bold text-slate-900 mb-6 xl:mb-8">Tổng quan kinh doanh</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 mb-8 xl:mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 xl:p-8 rounded-xl xl:rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 xl:mb-6">
              <span className="text-slate-500 text-sm xl:text-lg font-medium">{stat.title}</span>
              <div className={`p-2 xl:p-3 rounded-lg xl:rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5 xl:w-7 xl:h-7" />
              </div>
            </div>
            <div className="text-2xl xl:text-4xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl xl:rounded-2xl p-10 xl:p-16 text-center text-slate-400 border-dashed text-base xl:text-lg">
        <p>Biểu đồ phân tích doanh thu sẽ hiển thị ở đây</p>
      </div>
    </div>
  );
};

export default Dashboard;