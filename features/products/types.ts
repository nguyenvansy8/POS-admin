export type ProductCategory = 'food' | 'drink';

export interface AttributeOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface Attribute {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: AttributeOption[];
}

export interface CatalogItem {
  id: string;
  name: string;
  categoryId: ProductCategory;
  basePrice: number;
  icon?: string;
  availableAttributes: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  status: 'active' | 'out_of_stock';
  description?: string;
  catalogId?: string;
  selections?: Record<string, string[]>;
}