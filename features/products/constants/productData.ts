import { Attribute, CatalogItem, Product } from '../types';

export const CATALOGS: CatalogItem[] = [
  // Drinks
  { id: 'cat_coffee', name: 'Cà phê', categoryId: 'drink', basePrice: 25000, icon: 'Coffee', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice'] },
  { id: 'cat_milktea', name: 'Trà sữa', categoryId: 'drink', basePrice: 30000, icon: 'CupSoda', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice', 'attr_topping'] },
  { id: 'cat_tea', name: 'Trà trái cây', categoryId: 'drink', basePrice: 35000, icon: 'GlassWater', availableAttributes: ['attr_size_drink', 'attr_sugar', 'attr_ice', 'attr_topping'] },
  
  // Foods
  { id: 'cat_burger', name: 'Burger', categoryId: 'food', basePrice: 45000, icon: 'Sandwich', availableAttributes: ['attr_size_food', 'attr_extra_food'] },
  { id: 'cat_noodle', name: 'Mì ý / Nui', categoryId: 'food', basePrice: 50000, icon: 'Soup', availableAttributes: ['attr_size_food', 'attr_sauce', 'attr_extra_food'] },
  { id: 'cat_pizza', name: 'Pizza', categoryId: 'food', basePrice: 89000, icon: 'Pizza', availableAttributes: ['attr_size_pizza', 'attr_crust', 'attr_extra_food'] },
  { id: 'cat_rice', name: 'Cơm', categoryId: 'food', basePrice: 40000, icon: 'UtensilsCrossed', availableAttributes: ['attr_size_food', 'attr_extra_food'] },
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
      { id: '30', label: '30% Đường', priceModifier: 0 },
      { id: '50', label: '50% Đường', priceModifier: 0 },
      { id: '70', label: '70% Đường', priceModifier: 0 },
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
      { id: 't5', label: 'Kem cheese', priceModifier: 10000 },
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
    id: 'attr_crust', name: 'Đế bánh', type: 'single',
    options: [
      { id: 'thin', label: 'Đế mỏng', priceModifier: 0 },
      { id: 'thick', label: 'Đế dày', priceModifier: 0 },
      { id: 'cheese', label: 'Viền phô mai', priceModifier: 15000 },
    ]
  },
  {
    id: 'attr_extra_food', name: 'Thêm món', type: 'multiple',
    options: [
      { id: 'ex1', label: 'Thêm Phô mai', priceModifier: 10000 },
      { id: 'ex2', label: 'Thêm Trứng ốp la', priceModifier: 5000 },
      { id: 'ex3', label: 'Thêm Thịt xông khói', priceModifier: 15000 },
    ]
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Coffee
  { 
    id: 'P001', name: 'Cà phê Sữa đá', sku: 'CF-MILK', category: 'drink', price: 29000, status: 'active', 
    catalogId: 'cat_coffee', description: 'Đậm đà hương vị Việt',
    selections: { 'attr_size_drink': ['m'], 'attr_sugar': ['50'], 'attr_ice': ['100'] }
  },
  { 
    id: 'P002', name: 'Bạc xỉu', sku: 'CF-BAC', category: 'drink', price: 32000, status: 'active', 
    catalogId: 'cat_coffee', description: 'Nhiều sữa ít cafe',
    selections: { 'attr_size_drink': ['m'] }
  },
  { 
    id: 'P003', name: 'Americano Đá', sku: 'CF-AME', category: 'drink', price: 35000, status: 'active', 
    catalogId: 'cat_coffee', description: 'Espresso & Nước',
    selections: { 'attr_size_drink': ['l'], 'attr_sugar': ['0'] }
  },

  // Milktea
  { 
    id: 'P004', name: 'Trà sữa Truyền thống', sku: 'MT-TRAD', category: 'drink', price: 35000, status: 'active', 
    catalogId: 'cat_milktea', description: 'Trân châu đen dai ngon',
    selections: { 'attr_topping': ['t1'] }
  },
  { 
    id: 'P005', name: 'Trà sữa Oolong Lài', sku: 'MT-OOL', category: 'drink', price: 38000, status: 'active', 
    catalogId: 'cat_milktea', description: 'Thơm nhẹ mùi lài',
    selections: { 'attr_topping': ['t2'] }
  },
  { 
    id: 'P006', name: 'Sữa tươi Trân châu', sku: 'MT-SUGAR', category: 'drink', price: 42000, status: 'out_of_stock', 
    catalogId: 'cat_milktea', description: 'Đường đen Hàn Quốc',
    selections: { 'attr_topping': ['t1'] }
  },

  // Tea
  { 
    id: 'P007', name: 'Trà Đào Cam Sả', sku: 'T-PEACH', category: 'drink', price: 45000, status: 'active', 
    catalogId: 'cat_tea', description: 'Miếng đào giòn tan',
    selections: { 'attr_size_drink': ['l'] }
  },
  { 
    id: 'P008', name: 'Trà Vải Hoa Hồng', sku: 'T-LYCHEE', category: 'drink', price: 45000, status: 'active', 
    catalogId: 'cat_tea', description: 'Hương hoa hồng dịu nhẹ',
    selections: { 'attr_size_drink': ['l'] }
  },

  // Burger
  { 
    id: 'P009', name: 'Burger Bò Phô mai', sku: 'BG-BEEF', category: 'food', price: 59000, status: 'active', 
    catalogId: 'cat_burger', description: 'Bò Úc nướng lửa',
    selections: { 'attr_extra_food': ['ex1'] }
  },
  { 
    id: 'P010', name: 'Burger Gà Giòn', sku: 'BG-CHICK', category: 'food', price: 49000, status: 'active', 
    catalogId: 'cat_burger', description: 'Gà chiên giòn tan',
    selections: {}
  },

  // Pizza
  { 
    id: 'P011', name: 'Pizza Hải Sản Pesto', sku: 'PZ-SEA', category: 'food', price: 169000, status: 'active', 
    catalogId: 'cat_pizza', description: 'Tôm, Mực & Sốt Pesto',
    selections: { 'attr_size_pizza': ['p_m'], 'attr_crust': ['thin'] }
  },
  { 
    id: 'P012', name: 'Pizza Pepperoni', sku: 'PZ-PEP', category: 'food', price: 139000, status: 'active', 
    catalogId: 'cat_pizza', description: 'Xúc xích cay & Phô mai',
    selections: { 'attr_size_pizza': ['p_l'], 'attr_crust': ['cheese'] }
  },

  // Noodle
  { 
    id: 'P013', name: 'Mì Ý Bò Bằm', sku: 'ND-BOLO', category: 'food', price: 79000, status: 'active', 
    catalogId: 'cat_noodle', description: 'Sốt Bolognese truyền thống',
    selections: { 'attr_size_food': ['std'] }
  },
  { 
    id: 'P014', name: 'Mì Ý Carbonara', sku: 'ND-CARB', category: 'food', price: 85000, status: 'active', 
    catalogId: 'cat_noodle', description: 'Sốt kem trứng & Ba chỉ',
    selections: { 'attr_size_food': ['std'] }
  },

  // Rice
  { 
    id: 'P015', name: 'Cơm Sườn Cốt lết', sku: 'RC-PORK', category: 'food', price: 55000, status: 'active', 
    catalogId: 'cat_rice', description: 'Sườn nướng mật ong',
    selections: { 'attr_extra_food': ['ex2'] }
  },
  { 
    id: 'P016', name: 'Cơm Gà Xối Mỡ', sku: 'RC-CHICK', category: 'food', price: 55000, status: 'active', 
    catalogId: 'cat_rice', description: 'Da giòn thịt mềm',
    selections: {}
  },
  { 
    id: 'P017', name: 'Cơm Bò Lúc Lắc', sku: 'RC-BEEF', category: 'food', price: 69000, status: 'active', 
    catalogId: 'cat_rice', description: 'Bò Mỹ khoai tây chiên',
    selections: {}
  },
];