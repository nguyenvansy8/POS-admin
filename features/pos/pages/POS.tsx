import React, { useState, useMemo } from 'react';
import { Search, Trash2, ShoppingBag, CreditCard, Save, ChevronDown, Coffee, Utensils, X, ChevronLeft, ChevronRight, Plus, Minus, PackageOpen } from 'lucide-react';
import { CATALOGS, INITIAL_PRODUCTS } from '../../products/constants/productData';
import { Product, ProductCategory } from '../../products/types';

// Mock Cart Item Interface
interface CartItem {
  cartId: string; // Still useful for React keys, though grouping logic relies on product.id
  product: Product;
  quantity: number;
}

const POS: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('drink');
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false); // Mobile Cart State

  // Initial Cart State (Grouped logic applied)
  const [cart, setCart] = useState<CartItem[]>([
    { cartId: 'c1', product: INITIAL_PRODUCTS[0], quantity: 1 },
    { cartId: 'c2', product: INITIAL_PRODUCTS[1], quantity: 2 }, // Example: Quantity 2
  ]);

  // Visual Styles Mapping based on Catalog ID (Pastel colors)
  const getCardStyle = (catalogId: string | undefined) => {
    switch (catalogId) {
      case 'cat_milktea': return 'bg-rose-50 border-rose-100 hover:border-rose-300';
      case 'cat_tea': return 'bg-lime-50 border-lime-100 hover:border-lime-300';
      case 'cat_blended': return 'bg-cyan-50 border-cyan-100 hover:border-cyan-300';
      case 'cat_coffee': return 'bg-amber-50 border-amber-100 hover:border-amber-300';
      case 'cat_burger': return 'bg-orange-50 border-orange-100 hover:border-orange-300';
      default: return 'bg-indigo-50 border-indigo-100 hover:border-indigo-300';
    }
  };

  const getCatalogColor = (catalogId: string) => {
    switch (catalogId) {
      case 'cat_milktea': return 'bg-rose-200 text-rose-800';
      case 'cat_tea': return 'bg-lime-200 text-lime-800';
      case 'cat_blended': return 'bg-cyan-200 text-cyan-800';
      case 'cat_coffee': return 'bg-amber-200 text-amber-800';
      case 'cat_burger': return 'bg-orange-200 text-orange-800';
      default: return 'bg-slate-200 text-slate-800';
    }
  };

  const getProductImage = (catalogId: string | undefined) => {
    if (catalogId === 'cat_milktea') return 'https://cdn-icons-png.flaticon.com/512/3081/3081162.png';
    if (catalogId === 'cat_tea') return 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png';
    if (catalogId === 'cat_coffee') return 'https://cdn-icons-png.flaticon.com/512/2935/2935413.png';
    if (catalogId === 'cat_burger') return 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png';
    return 'https://cdn-icons-png.flaticon.com/512/2515/2515183.png';
  };

  // Logic
  const filteredCatalogs = useMemo(() => 
    CATALOGS.filter(c => c.categoryId === selectedCategory), 
  [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      const matchCategory = p.category === selectedCategory;
      const matchCatalog = selectedCatalogId === 'all' || p.catalogId === selectedCatalogId;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchCatalog && matchSearch;
    });
  }, [selectedCategory, selectedCatalogId, searchQuery]);

  // --- CART LOGIC START ---

  // Check quantity of a specific product in cart
  const getItemQuantity = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (product: Product) => {
    if (product.status === 'out_of_stock') return;

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);

      if (existingItemIndex >= 0) {
        // Product exists, increment quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      } else {
        // New product, add to cart
        return [...prevCart, {
          cartId: `cart-${Date.now()}`,
          product: product,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove if quantity becomes 0
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  // --- CART LOGIC END ---

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen bg-slate-50 overflow-hidden font-sans relative">
      
      {/* LEFT SIDEBAR: FILTERS (Visible XL+) */}
      <div className="hidden xl:flex w-72 bg-white border-r border-slate-200 flex-col p-4 gap-6 z-10">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main Categories */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => { setSelectedCategory('drink'); setSelectedCatalogId('all'); }}
            className={`py-3 px-4 rounded-2xl font-bold text-lg transition-all shadow-sm text-left flex items-center justify-between ${
              selectedCategory === 'drink' 
                ? 'bg-emerald-800 text-white shadow-emerald-200' 
                : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            ĐỒ UỐNG
          </button>
          <button 
             onClick={() => { setSelectedCategory('food'); setSelectedCatalogId('all'); }}
             className={`py-3 px-4 rounded-2xl font-bold text-lg transition-all shadow-sm text-left flex items-center justify-between ${
              selectedCategory === 'food' 
                ? 'bg-emerald-800 text-white shadow-emerald-200' 
                : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            ĐỒ ĂN
          </button>
        </div>

        {/* Catalogs List */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">Catalogs</h3>
          <div className="space-y-2">
            <button
               onClick={() => setSelectedCatalogId('all')}
               className={`w-full text-left py-2 px-4 rounded-xl text-sm font-semibold transition-colors ${
                 selectedCatalogId === 'all' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'
               }`}
            >
              Tất cả
            </button>
            {filteredCatalogs.map(catalog => (
              <button
                key={catalog.id}
                onClick={() => setSelectedCatalogId(catalog.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  selectedCatalogId === catalog.id 
                    ? getCatalogColor(catalog.id) + ' shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {catalog.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: PRODUCT GRID */}
      <div className="flex-1 flex flex-col h-full bg-slate-100/50 relative overflow-hidden">
        
        {/* MOBILE/TABLET HEADER (Visible < XL) */}
        <div className="xl:hidden bg-white px-4 py-3 border-b border-slate-200 flex flex-col gap-3 flex-shrink-0 z-10">
            <div className="flex gap-3">
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Tìm món..." 
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <div className="flex bg-slate-100 p-1 rounded-xl flex-shrink-0">
                   <button 
                     onClick={() => { setSelectedCategory('drink'); setSelectedCatalogId('all'); }}
                     className={`p-2 rounded-lg transition-all ${selectedCategory === 'drink' ? 'bg-white shadow text-emerald-700' : 'text-slate-400'}`}
                   >
                      <Coffee className="w-5 h-5" />
                   </button>
                   <button 
                     onClick={() => { setSelectedCategory('food'); setSelectedCatalogId('all'); }}
                     className={`p-2 rounded-lg transition-all ${selectedCategory === 'food' ? 'bg-white shadow text-orange-600' : 'text-slate-400'}`}
                   >
                      <Utensils className="w-5 h-5" />
                   </button>
               </div>
            </div>

            {/* Horizontal Catalog Scroll */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
                 <button
                    onClick={() => setSelectedCatalogId('all')}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                      selectedCatalogId === 'all' 
                        ? 'bg-slate-800 text-white border-slate-800' 
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                 >
                   Tất cả
                 </button>
                 {filteredCatalogs.map(catalog => (
                    <button
                      key={catalog.id}
                      onClick={() => setSelectedCatalogId(catalog.id)}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                        selectedCatalogId === catalog.id 
                          ? getCatalogColor(catalog.id).replace('text-', 'border-').replace('bg-', 'bg-opacity-20 bg-') + ' border-current'
                          : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {catalog.name}
                    </button>
                 ))}
            </div>
        </div>

        {/* Desktop Header (XL Only) */}
        <div className="hidden xl:flex items-center justify-between mb-6 p-6 pb-0">
            <h2 className="text-xl font-bold text-slate-800 uppercase">
                {selectedCategory === 'drink' ? 'Đồ uống' : 'Đồ ăn'} 
                <span className="ml-2 text-slate-400 text-base normal-case">({filteredProducts.length} món)</span>
            </h2>
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 lg:pb-6">
          {filteredProducts.length === 0 ? (
            // EMPTY STATE WHEN NO PRODUCTS
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
               <div className="w-32 h-32 bg-slate-200/50 rounded-full flex items-center justify-center mb-6">
                  {searchQuery ? (
                    <Search className="w-12 h-12 text-slate-400" />
                  ) : (
                    <PackageOpen className="w-12 h-12 text-slate-400" />
                  )}
               </div>
               <h3 className="text-xl font-bold text-slate-700 mb-2">
                 {searchQuery ? 'Không tìm thấy kết quả' : 'Danh mục trống'}
               </h3>
               <p className="text-slate-500 max-w-sm">
                 {searchQuery 
                   ? `Không tìm thấy món nào phù hợp với từ khóa "${searchQuery}".` 
                   : 'Chưa có sản phẩm nào trong danh mục hoặc bộ lọc này.'}
               </p>
               {searchQuery && (
                 <button 
                   onClick={() => setSearchQuery('')}
                   className="mt-6 px-6 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                 >
                   Xóa tìm kiếm
                 </button>
               )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 xl:gap-6">
              {filteredProducts.map(product => {
                const quantity = getItemQuantity(product.id);
                return (
                  <div 
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className={`
                      relative p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 transition-all cursor-pointer group flex flex-col items-center text-center h-full min-h-[200px] md:min-h-[240px]
                      ${quantity > 0 ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-100' : getCardStyle(product.catalogId)}
                      ${product.status === 'out_of_stock' ? 'opacity-70 grayscale-[0.5]' : 'active:scale-95 md:hover:scale-[1.02] md:hover:shadow-lg'}
                    `}
                  >
                     {/* Quantity Badge on Top Right */}
                     {quantity > 0 && (
                       <div className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs shadow-md z-30 animate-in zoom-in duration-200">
                         {quantity}
                       </div>
                     )}

                     {/* Out of Stock Ribbon */}
                     {product.status === 'out_of_stock' && (
                       <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50/30 rounded-2xl md:rounded-3xl backdrop-blur-[1px] overflow-hidden">
                          <div className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-12 py-1 transform -rotate-45 shadow-lg absolute top-4 -left-10 w-48 text-center">
                              HẾT HÀNG
                          </div>
                       </div>
                     )}

                     {/* Product Image (Icon) */}
                     <div className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4 drop-shadow-md transform transition-transform group-hover:-translate-y-2 duration-300">
                        <img 
                          src={getProductImage(product.catalogId)} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                     </div>

                     {/* Content */}
                     <div className="mt-auto w-full">
                       <h3 className="font-bold text-slate-800 text-sm md:text-lg leading-tight mb-1 line-clamp-2">{product.name}</h3>
                       <p className="text-[10px] md:text-xs text-slate-400 mb-2 uppercase tracking-wide">{product.sku}</p>
                       
                       {/* Dynamic Price or Quantity Control */}
                       <div className="h-9 md:h-10 flex items-center justify-center w-full mt-1">
                          {quantity > 0 ? (
                            <div 
                               className="flex items-center bg-emerald-600 rounded-full shadow-lg p-0.5 animate-in slide-in-from-bottom-2 duration-200"
                               onClick={(e) => e.stopPropagation()} // Prevent card click
                            >
                               <button 
                                 onClick={() => updateQuantity(product.id, -1)}
                                 className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white hover:bg-emerald-700 rounded-full transition-colors active:scale-90"
                               >
                                 <Minus className="w-4 h-4 md:w-5 md:h-5" />
                               </button>
                               <span className="w-8 md:w-10 text-center font-bold text-white text-sm md:text-base">
                                 {quantity}
                               </span>
                               <button 
                                 onClick={() => updateQuantity(product.id, 1)}
                                 className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white hover:bg-emerald-700 rounded-full transition-colors active:scale-90"
                               >
                                 <Plus className="w-4 h-4 md:w-5 md:h-5" />
                               </button>
                            </div>
                          ) : (
                            <div className="bg-white/60 rounded-full py-1 px-3 md:py-1.5 md:px-4 inline-block font-bold text-slate-700 text-xs md:text-base shadow-sm">
                               {new Intl.NumberFormat('vi-VN').format(product.price)}
                            </div>
                          )}
                       </div>
                     </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MOBILE CART BAR (Visible < LG) */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30 safe-area-bottom">
             <button 
               onClick={() => setIsMobileCartOpen(true)}
               className="w-full bg-emerald-800 text-white rounded-xl p-3 md:p-4 flex items-center justify-between shadow-lg shadow-emerald-100 active:scale-[0.98] transition-transform"
             >
                <div className="flex items-center gap-3">
                   <div className="bg-emerald-900/50 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                     {totalItems}
                   </div>
                   <div className="text-left">
                     <div className="text-xs text-emerald-200 font-medium uppercase">Giỏ hàng</div>
                     <div className="font-bold text-sm">Xem chi tiết</div>
                   </div>
                </div>
                <div className="font-bold text-lg md:text-xl">
                  {new Intl.NumberFormat('vi-VN').format(totalAmount)}đ
                </div>
             </button>
        </div>

      </div>

      {/* RIGHT SIDEBAR: CART (Responsive) */}
      {/* Overlay for mobile */}
      {isMobileCartOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileCartOpen(false)}
        />
      )}
      
      <div className={`
        fixed inset-x-0 bottom-0 top-10 z-50 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col lg:relative lg:inset-auto lg:top-auto lg:transform-none lg:w-96 lg:rounded-none lg:shadow-xl lg:border-l lg:border-slate-200 lg:flex
        ${isMobileCartOpen ? 'translate-y-0' : 'translate-y-[110%] lg:translate-y-0'}
      `}>
        
        {/* Cart Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
           <div className="flex items-center gap-3 text-slate-800">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-wide text-sm">Giỏ hàng ({totalItems})</h2>
           </div>
           {/* Mobile Close Button */}
           <button 
             onClick={() => setIsMobileCartOpen(false)}
             className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
           >
             <ChevronDown className="w-6 h-6" />
           </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
               <ShoppingBag className="w-16 h-16 opacity-20" />
               <p>Chưa có sản phẩm nào</p>
            </div>
          ) : (
             cart.map(item => (
                <div key={item.cartId} className="group flex items-start justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                   <div className="flex-1 pr-2">
                      <h4 className="font-bold text-slate-800">{item.product.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {item.product.description || 'Tiêu chuẩn'}
                      </p>
                      
                      {/* Price and Quantity Control in Sidebar */}
                      <div className="flex items-center justify-between mt-2">
                         <p className="text-sm font-semibold text-emerald-600">
                            {new Intl.NumberFormat('vi-VN').format(item.product.price * item.quantity)}
                         </p>
                         
                         <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-0.5">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-emerald-600 active:scale-95 transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-emerald-600 active:scale-95 transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => removeFromCart(item.cartId)}
                     className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all self-center"
                   >
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
             ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 space-y-4 flex-shrink-0 safe-area-bottom">
           {/* Summary */}
           <div className="flex justify-between items-end">
              <span className="text-slate-500 font-bold text-sm uppercase">Tổng thanh toán</span>
              <div className="text-right">
                 <span className="block text-2xl font-extrabold text-slate-800">
                    {new Intl.NumberFormat('vi-VN').format(totalAmount)} 
                    <span className="text-base font-bold text-slate-500 ml-1">VNĐ</span>
                 </span>
              </div>
           </div>

           {/* Buttons */}
           <div className="space-y-3">
              <button className="w-full py-3.5 md:py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                 <span className="tracking-wide">THANH TOÁN</span>
              </button>
              
              <button className="w-full py-3 bg-white border-2 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                 TẠM ỨNG / LƯU ĐƠN
              </button>
           </div>
        </div>

      </div>

    </div>
  );
};

export default POS;