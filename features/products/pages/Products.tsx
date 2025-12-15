import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Coffee, Utensils, MoreHorizontal, Edit3 } from 'lucide-react';
import ProductBuilder from '../components/ProductBuilder';
import ProductEmptyState from '../components/ProductEmptyState';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants/productData';

const Products: React.FC = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenBuilder = (productToEdit?: Product) => {
    setEditingProduct(productToEdit || null);
    setIsBuilderOpen(true);
  };

  const handleSaveProduct = (productPreview: any) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: productPreview.name,
              price: productPreview.price,
              description: productPreview.description,
              selections: productPreview.selections,
              catalogId: productPreview.catalogId
            }
          : p
      ));
    } else {
      // Create new product
      const newProduct: Product = {
        id: `P${Math.floor(Math.random() * 10000)}`,
        name: productPreview.name,
        sku: `SKU-${Date.now().toString().slice(-4)}`,
        category: 'drink', // In a real app, this should come from catalog category
        price: productPreview.price,
        status: 'active',
        description: productPreview.description,
        selections: productPreview.selections,
        catalogId: productPreview.catalogId
      };
      setProducts([newProduct, ...products]);
    }
    setIsBuilderOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-4 md:p-6 xl:p-10 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 xl:mb-10">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-slate-900 flex items-center gap-3">
            Danh sách sản phẩm
            <span className="px-3 py-1 xl:px-4 xl:py-1.5 bg-indigo-50 text-indigo-600 text-xs xl:text-sm rounded-full font-bold">
              {products.length}
            </span>
          </h1>
          <p className="text-slate-500 text-sm xl:text-base mt-2">Quản lý thực đơn đồ ăn và đồ uống</p>
        </div>

        {products.length > 0 && (
          <button 
            onClick={() => handleOpenBuilder()}
            className="flex items-center justify-center gap-2 xl:gap-3 px-5 py-2.5 xl:px-8 xl:py-4 bg-indigo-600 text-white font-bold text-sm xl:text-lg rounded-lg xl:rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            <Plus className="w-5 h-5 xl:w-6 xl:h-6" />
            Thêm món mới
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <ProductEmptyState onCreateClick={() => handleOpenBuilder()} />
      ) : (
        <>
          {/* Filter Bar */}
          <div className="bg-white p-4 xl:p-6 rounded-xl xl:rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 xl:gap-5 mb-6 xl:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 xl:left-4 xl:top-3.5 w-5 h-5 xl:w-6 xl:h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên món, mã SKU..." 
                className="w-full pl-10 pr-4 py-2.5 xl:pl-12 xl:pr-6 xl:py-3.5 text-base xl:text-lg bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg xl:rounded-xl outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
               <button className="px-4 py-2.5 xl:px-6 xl:py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg xl:rounded-xl text-sm xl:text-base font-medium transition-colors flex items-center gap-2 xl:gap-3">
                 <Filter className="w-4 h-4 xl:w-5 xl:h-5" /> Bộ lọc
               </button>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-xl xl:rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-4 xl:px-8 xl:py-5 text-xs xl:text-sm font-bold text-slate-500 uppercase">Tên sản phẩm</th>
                    <th className="px-4 py-4 xl:px-8 xl:py-5 text-xs xl:text-sm font-bold text-slate-500 uppercase">Giá bán</th>
                    <th className="px-4 py-4 xl:px-8 xl:py-5 text-xs xl:text-sm font-bold text-slate-500 uppercase">Mô tả / Attribute</th>
                    <th className="px-4 py-4 xl:px-8 xl:py-5 text-xs xl:text-sm font-bold text-slate-500 uppercase">Trạng thái</th>
                    <th className="px-4 py-4 xl:px-8 xl:py-5 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr 
                      key={product.id} 
                      onClick={() => handleOpenBuilder(product)}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <td className="px-4 py-4 xl:px-8 xl:py-6">
                        <div className="flex items-center gap-3 xl:gap-4">
                          <div className={`w-10 h-10 xl:w-14 xl:h-14 rounded-lg xl:rounded-xl flex items-center justify-center ${product.category === 'drink' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                             {product.category === 'drink' ? <Coffee className="w-5 h-5 xl:w-7 xl:h-7" /> : <Utensils className="w-5 h-5 xl:w-7 xl:h-7" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm xl:text-lg text-slate-900">{product.name}</p>
                            <p className="text-xs xl:text-sm text-slate-400 mt-1">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 xl:px-8 xl:py-6 font-semibold text-base xl:text-xl text-slate-700">
                        {new Intl.NumberFormat('vi-VN').format(product.price)}đ
                      </td>
                      <td className="px-4 py-4 xl:px-8 xl:py-6 text-sm xl:text-base text-slate-500 max-w-xs truncate">
                        {product.description || '-'}
                      </td>
                      <td className="px-4 py-4 xl:px-8 xl:py-6">
                        <span className="px-2 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Đang bán
                        </span>
                      </td>
                      <td className="px-4 py-4 xl:px-8 xl:py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenBuilder(product); }}
                            className="p-2 xl:p-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg xl:rounded-xl transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="w-5 h-5 xl:w-6 xl:h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {isBuilderOpen && (
        <ProductBuilder 
          initialData={editingProduct}
          onClose={() => setIsBuilderOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Products;