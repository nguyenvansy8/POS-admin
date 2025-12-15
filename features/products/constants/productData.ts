import { Attribute, CatalogItem, Product } from '../types';

export const CATALOGS: CatalogItem[] = [
  // Drinks
  { id: 'cat_coffee', name: 'Cà phê', categoryId: 'drink', basePrice: 25000, icon: 'Coffee', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice'] },
  { id: 'cat_milktea', name: 'Trà sữa', categoryId: 'drink', basePrice: 30000, icon: 'CupSoda', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice', 'attr_topping'] },
  { id: 'cat_tea', name: 'Trà trái cây', categoryId: 'drink', basePrice: 35000, icon: 'IceCream', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice', 'attr_topping'] },
  { id: 'cat_blended', name: 'Đá xay', categoryId: 'drink', basePrice: 45000, icon: 'IceCream', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice'] },
  // Foods
  { id: 'cat_burger', name: 'Burger', categoryId: 'food', basePrice: 45000, icon: 'Sandwich', availableAttributes: ['attr_size_food', 'attr_extra_food'] },
  { id: 'cat_noodle', name: 'Mì ý / Nui', categoryId: 'food', basePrice: 50000, icon: 'Soup', availableAttributes: ['attr_size_food', 'attr_sauce', 'attr_extra_food'] },
  { id: 'cat_pizza', name: 'Pizza', categoryId: 'food', basePrice: 89000, icon: 'Pizza', availableAttributes: ['attr_size_pizza', 'attr_crust', 'attr_extra_food'] },
];

export const ATTRIBUTES: Attribute[] = [
  {
    id: 'attr_size_drink', name: 'Kích thước', type: 'single',
    options: [
      { id: 's', label: 'Size S', priceModifier: 0 },
      { id: 'm', label: 'Size M', priceModifier: 5000 },
      { id: 'l', label: 'Size L', priceModifier: 10000 },
    ]
  },
  {
    id: 'attr_sugar', name: 'Độ ngọt', type: 'single',
    options: [
      { id: '0', label: '0% Đường', priceModifier: 0 },
      { id: '50', label: '50% Đường', priceModifier: 0 },
      { id: '100', label: '100% Đường', priceModifier: 0 },
    ]
  },
  {
    id: 'attr_ice', name: 'Lượng đá', type: 'single',
    options: [
      { id: '0', label: 'Không đá', priceModifier: 0 },
      { id: '50', label: '50% Đá', priceModifier: 0 },
      { id: '100', label: '100% Đá', priceModifier: 0 },
    ]
  },
  {
    id: 'attr_topping', name: 'Topping (Chọn nhiều)', type: 'multiple',
    options: [
      { id: 't1', label: 'Trân châu đen', priceModifier: 5000 },
      { id: 't2', label: 'Trân châu trắng', priceModifier: 5000 },
      { id: 't3', label: 'Pudding trứng', priceModifier: 7000 },
      { id: 't4', label: 'Thạch dừa', priceModifier: 5000 },
    ]
  },
  {
    id: 'attr_size_food', name: 'Khẩu phần', type: 'single',
    options: [
      { id: 'std', label: 'Tiêu chuẩn', priceModifier: 0 },
      { id: 'big', label: 'Khổng lồ', priceModifier: 15000 },
    ]
  },
  {
    id: 'attr_size_pizza', name: 'Kích thước', type: 'single',
    options: [
      { id: 'p_s', label: 'Nhỏ (6")', priceModifier: 0 },
      { id: 'p_m', label: 'Vừa (9")', priceModifier: 30000 },
      { id: 'p_l', label: 'Lớn (12")', priceModifier: 60000 },
    ]
  },
  {
    id: 'attr_extra_food', name: 'Thêm món', type: 'multiple',
    options: [
      { id: 'ex1', label: 'Thêm Phô mai', priceModifier: 10000 },
      { id: 'ex2', label: 'Thêm Trứng', priceModifier: 5000 },
      { id: 'ex3', label: 'Thêm Thịt', priceModifier: 15000 },
    ]
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  { 
    id: 'P001', name: 'Trà Sữa TC', sku: 'TS-TC-01', category: 'drink', price: 50000, status: 'active', 
    description: 'Trân châu đen', catalogId: 'cat_milktea',
    selections: { 'attr_size_drink': ['m'], 'attr_topping': ['t1'] }
  },
  { 
    id: 'P002', name: 'Trà Sữa Kem Trứng', sku: 'TS-KT-02', category: 'drink', price: 55000, status: 'active', 
    description: 'Kem trứng nướng', catalogId: 'cat_milktea',
    selections: { 'attr_size_drink': ['m'], 'attr_topping': ['t3'] }
  },
  { 
    id: 'P003', name: 'Trà Sữa TC', sku: 'TS-TC-03', category: 'drink', price: 50000, status: 'active', 
    description: 'Size L', catalogId: 'cat_milktea',
    selections: { 'attr_size_drink': ['l'] }
  },
  { 
    id: 'P004', name: 'Sữa Tươi TC DL', sku: 'ST-TC-04', category: 'drink', price: 50000, status: 'out_of_stock', 
    description: 'Đường đen', catalogId: 'cat_milktea',
    selections: { 'attr_size_drink': ['m'] }
  },
  { 
    id: 'P005', name: 'Trà Đào Cam Sả', sku: 'TD-CS-05', category: 'drink', price: 45000, status: 'active', 
    description: 'Tươi mát', catalogId: 'cat_tea',
    selections: { 'attr_size_drink': ['m'] }
  },
  { 
    id: 'P006', name: 'Lục Trà Táo Xanh', sku: 'LT-TX-06', category: 'drink', price: 40000, status: 'active', 
    description: 'Thạch táo', catalogId: 'cat_tea',
    selections: { 'attr_size_drink': ['m'] }
  },
   { 
    id: 'P007', name: 'Burger Bò Cheese', sku: 'BG-BC-07', category: 'food', price: 65000, status: 'active', 
    description: '2 lớp bò', catalogId: 'cat_burger',
    selections: { 'attr_size_food': ['big'] }
  },
];