import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building, MapPin, Phone, User, GitBranch, Plus, 
  Search, AlertCircle, LayoutList, LayoutGrid 
} from 'lucide-react';
import { Store, Branch, BranchFormData } from '../types';
import { ViewMode } from '../../../types/shared';
import { BranchTableView, BranchCardView } from '../components/BranchViews';
import CreateBranchModal from '../components/CreateBranchModal';

// Mock data helpers
const generateMockBranches = (count: number): Branch[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `BR-${100 + i}`,
    code: `CN00${i + 1}`,
    name: `Chi nhánh ${i + 1}`,
    address: `${20 + i} Lê Lợi, P. Bến Nghé, Quận 1, TP.HCM`,
    phone: `0909${Math.floor(Math.random() * 900000) + 100000}`,
    managerName: `Quản lý ${String.fromCharCode(65 + i)}`,
    status: Math.random() > 0.8 ? 'inactive' : 'active'
  }));
};

const StoreDetail: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      // Mock store details based on ID
      setStore({
        id: storeId || 'ST-000',
        name: 'Cửa hàng Quận 1',
        address: '10 Nguyễn Huệ, Quận 1, TP.HCM',
        phone: '0901234567',
        managerName: 'Nguyễn Văn A',
        status: 'active',
        revenue: 1500000000
      });
      // Mock branches
      setBranches(generateMockBranches(0));
      setLoading(false);
    }, 600);
  }, [storeId]);

  const handleCreateBranch = (data: BranchFormData) => {
    const newBranch: Branch = {
      id: `BR-${Date.now()}`,
      ...data,
      status: 'active'
    };
    setBranches([newBranch, ...branches]);
    setIsModalOpen(false);
    setShowEmptyState(false);
  };

  const currentBranches = showEmptyState ? [] : branches;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!store) {
    return <div className="p-8">Không tìm thấy cửa hàng</div>;
  }

  return (
    <div className="min-h-full bg-slate-50 pb-20">
      {/* Header / Breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 md:sticky md:top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/stores')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 flex-shrink-0">
              <Building className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">{store.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px] md:max-w-none">{store.address}</span>
                </span>
                <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200 w-fit">
                  Hoạt động
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-0">
             <button 
              onClick={() => setShowEmptyState(!showEmptyState)}
              className="flex-1 md:flex-none px-3 py-2 text-sm font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              {showEmptyState ? 'Hiện dữ liệu mẫu' : 'Xem trạng thái trống'}
            </button>
            <button className="flex-1 md:flex-none px-3 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors text-sm">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase font-semibold">Quản lý cửa hàng</p>
              <p className="text-slate-900 font-medium">{store.managerName}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase font-semibold">Hotline</p>
              <p className="text-slate-900 font-medium">{store.phone}</p>
            </div>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase font-semibold">Tổng chi nhánh</p>
              <p className="text-slate-900 font-medium">{currentBranches.length} chi nhánh</p>
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Danh sách chi nhánh
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{currentBranches.length}</span>
            </h2>
            
            {currentBranches.length > 0 && (
              <div className="flex items-center gap-3 self-end sm:self-auto">
                 <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-md transition-all ${
                      viewMode === 'table' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Dạng bảng"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-1.5 rounded-md transition-all ${
                      viewMode === 'card' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                     title="Dạng thẻ"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
                 >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Thêm chi nhánh</span>
                    <span className="sm:hidden">Thêm</span>
                 </button>
              </div>
            )}
          </div>

          {currentBranches.length === 0 ? (
            // EMPTY STATE DESIGN
            <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative">
                <GitBranch className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-white">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có chi nhánh nào</h3>
              <p className="text-slate-500 max-w-sm mb-8 text-sm md:text-base">
                Cửa hàng này hiện chưa có chi nhánh trực thuộc. Tạo chi nhánh mới để bắt đầu quản lý kho và bán hàng.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Thêm chi nhánh ngay
              </button>
            </div>
          ) : (
            // LIST STATE DESIGN
            <div className="space-y-4 pb-8">
               {/* Toolbar for Table/Card (Search) */}
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Tìm theo mã, tên chi nhánh..." 
                      className="w-full pl-9 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
               </div>

               {viewMode === 'table' ? (
                 <BranchTableView branches={currentBranches} />
               ) : (
                 <BranchCardView branches={currentBranches} />
               )}
            </div>
          )}
        </div>
      </div>

      <CreateBranchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBranch}
      />
    </div>
  );
};

export default StoreDetail;