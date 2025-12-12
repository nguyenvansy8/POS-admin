import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Store } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './features/dashboard/pages/Dashboard';
import Stores from './features/stores/pages/Stores';
import StoreDetail from './features/stores/pages/StoreDetail';
import Products from './features/products/pages/Products';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col md:ml-64 xl:ml-72 transition-all duration-300 h-screen overflow-hidden">
          
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                   <Store className="text-white w-5 h-5" />
                 </div>
                 <span className="font-bold text-lg text-slate-800">POS Admin</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Avatar" />
            </div>
          </header>

          {/* Page Content Scrollable Area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/stores/:storeId" element={<StoreDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;