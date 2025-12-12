import React, { useState } from 'react';
import { Store as StoreIcon, LayoutGrid, LayoutList, Plus, Search, Filter } from 'lucide-react';
import { Store, StoreFormData } from '../types';
import { ViewMode } from '../../../types/shared';
import StoreEmptyState from '../components/StoreEmptyState';
import { StoreTableView, StoreCardView } from '../components/StoreViews';
import CreateStoreModal from '../components/CreateStoreModal';
import { useNavigate } from 'react-router-dom';

// Mock data generator
const generateMockStore = (id: number): Store => ({
    id: `ST-${1000 + id}`,
    name: `Cửa hàng ${['Quận 1', 'Thủ Đức', 'Bình Thạnh', 'Gò Vấp', 'Quận 3'][id % 5]}`,
    address: `${10 + id} ${['Nguyễn Huệ', 'Phạm Văn Đồng', 'Điện Biên Phủ', 'Lê Văn Thọ', 'Nam Kỳ Khởi Nghĩa'][id % 5]}, TP.HCM`,
    phone: `090${Math.floor(Math.random() * 90000000 + 10000000)}`,
    managerName: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'][id % 5],
    status: Math.random() > 0.8 ? 'maintenance' : Math.random() > 0.9 ? 'inactive' : 'active',
    revenue: Math.floor(Math.random() * 500000000) + 50000000
});

// Generate initial stores
const INITIAL_STORES = Array.from({ length: 0 }, (_, i) => generateMockStore(i));

const Stores: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES); 
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleCreateStore = (data: StoreFormData) => {
    const newStore: Store = {
      id: `ST-${Math.floor(Math.random() * 9000) + 1000}`,
      ...data,
      status: 'active',
      revenue: 0,
    };
    setStores([newStore, ...stores]);
    setIsModalOpen(false);
    setShowEmptyState(false);
  };

  const handleViewDetail = (storeId: string) => {
    navigate(`/stores/${storeId}`);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedStores = showEmptyState ? [] : filteredStores;

  return (
    <div className="p-4 md:p-6 xl:p-10 max-w-7xl mx-auto min-h-full">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 xl:mb-10">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-slate-900 flex items-center gap-3">
            Quản lý cửa hàng
            <span className="px-3 py-1 xl:px-4 xl:py-1.5 bg-indigo-50 text-indigo-600 text-xs xl:text-sm rounded-full font-bold">
              {displayedStores.length}
            </span>
          </h1>
          <p className="text-slate-500 text-sm xl:text-base mt-2">
            Quản lý danh sách cửa hàng và hiệu suất kinh doanh
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 xl:gap-4">
             <button 
              onClick={() => setShowEmptyState(!showEmptyState)}
              className="px-4 py-2.5 xl:px-6 xl:py-3.5 text-sm xl:text-base font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg xl:rounded-xl transition-colors whitespace-nowrap"
            >
              {showEmptyState ? 'Hiện dữ liệu mẫu' : 'Xem trạng thái trống'}
            </button>

            {displayedStores.length > 0 && (
             <div className="bg-white p-1 xl:p-1.5 rounded-lg xl:rounded-xl border border-slate-200 flex shadow-sm self-start sm:self-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 xl:p-3 rounded-md xl:rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Dạng bảng"
              >
                <LayoutList className="w-5 h-5 xl:w-6 xl:h-6" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 xl:p-3 rounded-md xl:rounded-lg transition-all ${
                  viewMode === 'card' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
                 title="Dạng thẻ"
              >
                <LayoutGrid className="w-5 h-5 xl:w-6 xl:h-6" />
              </button>
            </div>
            )}
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 xl:gap-3 px-4 py-2.5 xl:px-6 xl:py-3.5 bg-indigo-600 text-white text-sm xl:text-base font-medium rounded-lg xl:rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
            >
              <Plus className="w-4 h-4 xl:w-5 xl:h-5" />
              Thêm cửa hàng
            </button>
        </div>
      </div>

      {/* Content Area */}
      {displayedStores.length === 0 ? (
        <StoreEmptyState onCreateClick={() => setIsModalOpen(true)} />
      ) : (
        <div className="space-y-6 xl:space-y-8">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 xl:gap-5">
            <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm cửa hàng..." 
                    className="w-full pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-6 xl:py-3.5 text-sm xl:text-base bg-white border border-slate-200 rounded-lg xl:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
             <button className="flex items-center justify-center gap-2 xl:gap-3 px-4 py-2.5 xl:px-6 xl:py-3.5 bg-white border border-slate-200 text-slate-600 rounded-lg xl:rounded-xl hover:bg-slate-50 font-medium text-sm xl:text-base shadow-sm">
                <Filter className="w-4 h-4 xl:w-5 xl:h-5" />
                Bộ lọc
            </button>
          </div>

          {/* List/Grid View */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
            {displayedStores.length === 0 && searchQuery ? (
                <div className="text-center py-16 text-slate-500 text-base xl:text-lg">
                    Không tìm thấy cửa hàng nào phù hợp với "{searchQuery}"
                </div>
            ) : viewMode === 'table' ? (
              <StoreTableView stores={displayedStores} onViewDetail={handleViewDetail} />
            ) : (
              <StoreCardView stores={displayedStores} onViewDetail={handleViewDetail} />
            )}
          </div>
        </div>
      )}

      <CreateStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStore}
      />
    </div>
  );
};

export default Stores;