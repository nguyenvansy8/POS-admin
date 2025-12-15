import React from 'react';
import { LayoutDashboard, Store, Package, LogOut, Settings, X, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/' },
    { icon: ShoppingCart, label: 'Bán hàng (POS)', path: '/pos' },
    { icon: Store, label: 'Cửa hàng', path: '/stores' },
    { icon: Package, label: 'Sản phẩm', path: '/products' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 z-50 h-full w-64 xl:w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 xl:p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 xl:gap-4">
            <div className="w-8 h-8 xl:w-10 xl:h-10 bg-indigo-600 rounded-lg xl:rounded-xl flex items-center justify-center">
              <Store className="text-white w-5 h-5 xl:w-6 xl:h-6" />
            </div>
            <span className="text-xl xl:text-2xl font-bold text-slate-800">POS Admin</span>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-3 xl:p-4 space-y-1 xl:space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 xl:gap-4 px-4 py-3 xl:px-6 xl:py-4 rounded-lg xl:rounded-xl text-sm xl:text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 xl:w-6 xl:h-6" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 xl:p-4 border-t border-slate-100 space-y-1 xl:space-y-2 bg-white flex-shrink-0 mt-auto">
          <button className="flex w-full items-center gap-3 xl:gap-4 px-4 py-3 xl:px-6 xl:py-4 rounded-lg xl:rounded-xl text-sm xl:text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="w-5 h-5 xl:w-6 xl:h-6" />
            Cài đặt
          </button>
          <button className="flex w-full items-center gap-3 xl:gap-4 px-4 py-3 xl:px-6 xl:py-4 rounded-lg xl:rounded-xl text-sm xl:text-base font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 xl:w-6 xl:h-6" />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;