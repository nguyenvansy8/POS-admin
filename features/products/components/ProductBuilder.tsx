import React, { useState, useEffect } from 'react';
import { 
  Coffee, Utensils, ChevronRight, ChevronLeft, Check, 
  CupSoda, Pizza, Beef, Soup, IceCream, Sandwich, CheckCircle2
} from 'lucide-react';
import { ProductCategory, CatalogItem, Product } from '../types';
import { CATALOGS, ATTRIBUTES } from '../constants/productData';

// Helper to render dynamic icons
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  const icons: any = { Coffee, CupSoda, IceCream, Sandwich, Soup, Pizza, Beef, Utensils };
  const IconComponent = icons[name] || Utensils;
  return <IconComponent className={className} />;
};

// Define custom styles for each catalog type
const CATALOG_STYLES: Record<string, { bg: string, border: string, iconBg: string, iconColor: string }> = {
  'cat_coffee': { 
    bg: 'bg-amber-50 hover:bg-amber-100', 
    border: 'border-amber-200 hover:border-amber-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-amber-700' 
  },
  'cat_milktea': { 
    bg: 'bg-rose-50 hover:bg-rose-100', 
    border: 'border-rose-200 hover:border-rose-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-rose-700' 
  },
  'cat_tea': { 
    bg: 'bg-lime-50 hover:bg-lime-100', 
    border: 'border-lime-200 hover:border-lime-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-lime-700' 
  },
  'cat_burger': { 
    bg: 'bg-orange-50 hover:bg-orange-100', 
    border: 'border-orange-200 hover:border-orange-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-orange-700' 
  },
  'cat_pizza': { 
    bg: 'bg-red-50 hover:bg-red-100', 
    border: 'border-red-200 hover:border-red-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-red-700' 
  },
  'cat_noodle': { 
    bg: 'bg-yellow-50 hover:bg-yellow-100', 
    border: 'border-yellow-200 hover:border-yellow-400', 
    iconBg: 'bg-white shadow-sm', 
    iconColor: 'text-yellow-700' 
  },
};

const DEFAULT_STYLE = { 
  bg: 'bg-slate-50 hover:bg-slate-100', 
  border: 'border-slate-200 hover:border-indigo-400', 
  iconBg: 'bg-white shadow-sm', 
  iconColor: 'text-slate-700' 
};

interface ProductBuilderProps {
  initialData?: Product | null;
  onClose: () => void;
  onSave: (product: any) => void;
}

const ProductBuilder: React.FC<ProductBuilderProps> = ({ initialData, onClose, onSave }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>({}); // { attrId: [optionId1, optionId2] }

  // Load initial data for editing
  useEffect(() => {
    if (initialData && initialData.catalogId) {
      const catalog = CATALOGS.find(c => c.id === initialData.catalogId);
      if (catalog) {
        setSelectedCategory(catalog.categoryId);
        setSelectedCatalog(catalog);
        setSelections(initialData.selections || {});
        setStep(3); // Jump directly to customization
      }
    }
  }, [initialData]);

  // 1. SELECT CATEGORY
  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setStep(2);
  };

  // 2. SELECT CATALOG
  const handleSelectCatalog = (catalog: CatalogItem) => {
    setSelectedCatalog(catalog);
    // Initialize default selections for single-choice attributes (auto select first option)
    const initialSelections: Record<string, string[]> = {};
    catalog.availableAttributes.forEach(attrId => {
      const attr = ATTRIBUTES.find(a => a.id === attrId);
      if (attr && attr.type === 'single' && attr.options.length > 0) {
        initialSelections[attrId] = [attr.options[0].id];
      } else {
        initialSelections[attrId] = [];
      }
    });
    setSelections(initialSelections);
    setStep(3);
  };

  // 3. TOGGLE ATTRIBUTES
  const toggleAttribute = (attrId: string, optionId: string, type: 'single' | 'multiple') => {
    setSelections(prev => {
      if (type === 'single') {
        return { ...prev, [attrId]: [optionId] };
      } else {
        const current = prev[attrId] || [];
        if (current.includes(optionId)) {
          return { ...prev, [attrId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [attrId]: [...current, optionId] };
        }
      }
    });
  };

  // GENERATE PREVIEW
  const getGeneratedProduct = () => {
    if (!selectedCatalog) return null;
    
    let totalPrice = selectedCatalog.basePrice;
    let descriptionParts: string[] = [];

    selectedCatalog.availableAttributes.forEach(attrId => {
      const attr = ATTRIBUTES.find(a => a.id === attrId);
      const selectedOptionIds = selections[attrId] || [];
      
      if (attr && selectedOptionIds.length > 0) {
        const selectedOptions = attr.options.filter(o => selectedOptionIds.includes(o.id));
        selectedOptions.forEach(opt => {
          totalPrice += opt.priceModifier;
          descriptionParts.push(opt.label);
        });
      }
    });

    return {
      name: selectedCatalog.name,
      description: descriptionParts.join(' - '),
      price: totalPrice,
      fullTitle: `${selectedCatalog.name} (${descriptionParts.join(', ')})`,
      catalogId: selectedCatalog.id,
      selections: selections,
      id: initialData?.id // Preserve ID if editing
    };
  };

  const preview = getGeneratedProduct();

  // RENDER STEPS
  return (
    <div className="fixed inset-0 z-30 md:left-64 xl:left-72 bg-slate-100 flex flex-col animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 xl:px-8 xl:py-5 flex items-center justify-between shadow-sm sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center gap-4 xl:gap-6">
          <button onClick={onClose} className="p-2 xl:p-3 hover:bg-slate-100 rounded-full text-slate-500">
            <XIcon />
          </button>
          <div>
            <h2 className="text-lg xl:text-2xl font-bold text-slate-800">
              {initialData ? 'Chỉnh sửa món' : (step === 1 ? 'Chọn loại sản phẩm' : step === 2 ? `Menu ${selectedCategory === 'food' ? 'Đồ ăn' : 'Đồ uống'}` : 'Tùy chọn món')}
            </h2>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 xl:h-2 w-10 xl:w-16 rounded-full transition-colors ${s <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
        {step > 1 && (
           <button 
             onClick={() => {
                setStep(prev => (prev - 1) as any)
             }}
             className="text-base xl:text-lg font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2 px-3 py-1.5 xl:px-4 xl:py-2"
           >
             <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" /> Quay lại
           </button>
        )}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-10 max-w-6xl mx-auto w-full">
        
        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 h-full items-center">
            <button 
              onClick={() => handleSelectCategory('drink')}
              className="group bg-blue-50 hover:bg-blue-100 border-4 border-blue-100 hover:border-blue-400 rounded-2xl xl:rounded-3xl p-8 md:p-12 xl:p-16 transition-all shadow-sm hover:shadow-xl flex flex-col items-center gap-6 xl:gap-8 text-center"
            >
              <div className="w-24 h-24 xl:w-48 xl:h-48 rounded-full bg-white text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Coffee className="w-12 h-12 xl:w-24 xl:h-24" />
              </div>
              <div>
                <h3 className="text-2xl xl:text-4xl font-bold text-slate-800 group-hover:text-blue-700">Đồ uống</h3>
                <p className="text-slate-500 mt-2 xl:mt-4 text-base xl:text-2xl">Cafe, Trà sữa, Sinh tố...</p>
              </div>
            </button>

            <button 
              onClick={() => handleSelectCategory('food')}
              className="group bg-orange-50 hover:bg-orange-100 border-4 border-orange-100 hover:border-orange-400 rounded-2xl xl:rounded-3xl p-8 md:p-12 xl:p-16 transition-all shadow-sm hover:shadow-xl flex flex-col items-center gap-6 xl:gap-8 text-center"
            >
              <div className="w-24 h-24 xl:w-48 xl:h-48 rounded-full bg-white text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Utensils className="w-12 h-12 xl:w-24 xl:h-24" />
              </div>
              <div>
                <h3 className="text-2xl xl:text-4xl font-bold text-slate-800 group-hover:text-orange-700">Đồ ăn</h3>
                <p className="text-slate-500 mt-2 xl:mt-4 text-base xl:text-2xl">Cơm, Mì, Burger, Pizza...</p>
              </div>
            </button>
          </div>
        )}

        {/* STEP 2: CATALOG */}
        {step === 2 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 animate-in slide-in-from-right-8 duration-300">
            {CATALOGS.filter(c => c.categoryId === selectedCategory).map((catalog) => {
              const style = CATALOG_STYLES[catalog.id] || DEFAULT_STYLE;
              return (
                <button
                  key={catalog.id}
                  onClick={() => handleSelectCatalog(catalog)}
                  className={`${style.bg} ${style.border} border-2 rounded-2xl xl:rounded-3xl p-4 xl:p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-center text-center gap-4 xl:gap-8 group relative overflow-hidden`}
                >
                  <div className={`w-20 h-20 xl:w-40 xl:h-40 rounded-full ${style.iconBg} flex items-center justify-center ${style.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <IconRenderer name={catalog.icon || 'Utensils'} className="w-10 h-10 xl:w-20 xl:h-20" />
                  </div>
                  <div className="z-10 relative">
                    <div className="font-bold text-lg xl:text-2xl text-slate-800 mb-2">{catalog.name}</div>
                    <span className="text-sm xl:text-lg font-bold text-slate-700 bg-white/60 px-3 py-1 xl:px-4 xl:py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-slate-100">
                      {new Intl.NumberFormat('vi-VN').format(catalog.basePrice)}đ
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* STEP 3: ATTRIBUTES (WIZARD) */}
        {step === 3 && selectedCatalog && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 animate-in slide-in-from-right-8 duration-300">
            
            {/* Left: Options */}
            <div className="xl:col-span-2 space-y-6 xl:space-y-8">
              {selectedCatalog.availableAttributes.map((attrId) => {
                const attr = ATTRIBUTES.find(a => a.id === attrId);
                if (!attr) return null;

                return (
                  <div key={attr.id} className="bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-8 shadow-sm border border-slate-200">
                    <h4 className="text-lg xl:text-xl font-bold text-slate-800 mb-4 xl:mb-6 flex items-center gap-3">
                      {attr.name}
                      {attr.type === 'multiple' && <span className="text-xs xl:text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 xl:px-3 xl:py-1 rounded-full">Chọn nhiều</span>}
                    </h4>
                    
                    <div className="flex flex-wrap gap-3 xl:gap-4">
                      {attr.options.map((option) => {
                        const isSelected = (selections[attr.id] || []).includes(option.id);
                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleAttribute(attr.id, option.id, attr.type)}
                            className={`
                              relative flex items-center gap-2 xl:gap-3 px-4 py-3 xl:px-8 xl:py-5 rounded-xl xl:rounded-2xl border-2 transition-all font-semibold text-sm xl:text-xl min-w-[100px] xl:min-w-[140px] justify-center
                              ${isSelected 
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                                : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                              }
                            `}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 xl:-top-3 xl:-right-3 bg-indigo-600 text-white rounded-full p-0.5 xl:p-1 border-4 border-white">
                                <Check className="w-3 h-3 xl:w-4 xl:h-4" />
                              </div>
                            )}
                            {option.label}
                            {option.priceModifier > 0 && (
                              <span className="text-xs xl:text-base text-slate-500 font-normal ml-1">
                                (+{option.priceModifier / 1000}k)
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Preview & Action */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl xl:rounded-3xl shadow-xl border border-slate-100 p-5 xl:p-8 sticky top-0 xl:top-0">
                <h3 className="text-slate-400 font-bold text-xs xl:text-sm uppercase mb-4 xl:mb-6 tracking-wider">Xem trước món</h3>
                
                <div className="flex flex-col items-center text-center mb-6 xl:mb-8">
                   <div className="w-20 h-20 xl:w-32 xl:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 xl:mb-6 shadow-xl shadow-indigo-200">
                      <IconRenderer name={selectedCatalog.icon || 'Utensils'} className="w-10 h-10 xl:w-16 xl:h-16" />
                   </div>
                   <h2 className="text-xl xl:text-3xl font-bold text-slate-900 leading-tight mb-2">{preview?.name}</h2>
                   {preview?.description && (
                     <p className="text-slate-500 text-sm xl:text-lg leading-relaxed">{preview.description}</p>
                   )}
                </div>

                <div className="border-t border-dashed border-slate-200 my-4 xl:my-8 pt-4 xl:pt-8 flex items-center justify-between">
                   <span className="text-slate-500 font-bold text-base xl:text-lg">Tổng tiền</span>
                   <span className="text-2xl xl:text-4xl font-extrabold text-indigo-600">
                     {new Intl.NumberFormat('vi-VN').format(preview?.price || 0)}
                     <span className="text-base xl:text-xl align-top ml-1 font-semibold">đ</span>
                   </span>
                </div>

                <button 
                  onClick={() => onSave(preview)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 xl:py-6 rounded-xl xl:rounded-2xl font-bold text-lg xl:text-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 xl:gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 xl:w-8 xl:h-8" />
                  {initialData ? 'Lưu thay đổi' : 'Thêm vào thực đơn'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

// Simple Close Icon component for local use (Larger size)
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="xl:w-8 xl:h-8"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default ProductBuilder;