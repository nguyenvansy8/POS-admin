import React, { useState } from 'react';
import { X, Store as StoreIcon, MapPin, Phone, User } from 'lucide-react';
import { StoreFormData } from '../types';

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
}

const CreateStoreModal: React.FC<CreateStoreModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    address: '',
    phone: '',
    managerName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', address: '', phone: '', managerName: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl xl:rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 xl:px-8 xl:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
          <h3 className="text-lg xl:text-xl font-bold text-slate-800">Thêm cửa hàng mới</h3>
          <button
            onClick={onClose}
            className="p-2 xl:p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 xl:p-8 space-y-4 xl:space-y-6 overflow-y-auto">
          <div className="space-y-2 xl:space-y-3">
            <label className="text-sm xl:text-base font-semibold text-slate-700">Tên cửa hàng</label>
            <div className="relative">
              <StoreIcon className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Cửa hàng Quận 1"
                className="w-full bg-white pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-4 xl:py-3.5 text-base xl:text-lg border border-slate-300 rounded-lg xl:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 xl:space-y-3">
            <label className="text-sm xl:text-base font-semibold text-slate-700">Địa chỉ</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Đường Nguyễn Huệ..."
                className="w-full bg-white pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-4 xl:py-3.5 text-base xl:text-lg border border-slate-300 rounded-lg xl:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
            <div className="space-y-2 xl:space-y-3">
              <label className="text-sm xl:text-base font-semibold text-slate-700">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="090123..."
                  className="w-full bg-white pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-4 xl:py-3.5 text-base xl:text-lg border border-slate-300 rounded-lg xl:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 xl:space-y-3">
              <label className="text-sm xl:text-base font-semibold text-slate-700">Quản lý</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
                <input
                  type="text"
                  name="managerName"
                  required
                  value={formData.managerName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-white pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-4 xl:py-3.5 text-base xl:text-lg border border-slate-300 rounded-lg xl:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 xl:pt-6 flex items-center justify-end gap-3 xl:gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 xl:px-6 xl:py-3.5 text-sm xl:text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg xl:rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 xl:px-8 xl:py-3.5 text-sm xl:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg xl:rounded-xl shadow-lg shadow-indigo-200 transition-colors"
            >
              Tạo cửa hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoreModal;