import {makeAutoObservable, autorun, toJS} from 'mobx';

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});

    try {
      const raw = localStorage.getItem('cart_items');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.items = parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }

    autorun(() => {
      try {
        const data = toJS(this.items);
        localStorage.setItem('cart_items', JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    });
  }

  addItem({product, colorId, sizeId, imageUrl}) {
    if (!product) return;
    const exists = this.items.find(i => i.productId === product.id && i.colorId === colorId && i.sizeId === sizeId);
    if (exists) return;
    this.items.push({productId: product.id, colorId, sizeId, product, imageUrl});
  }

  removeItem({productId, colorId, sizeId}) {
    this.items = this.items.filter(i => !(i.productId === productId && i.colorId === colorId && i.sizeId === sizeId));
  }

  clear() {
    this.items = [];
  }

  get count() {
    return this.items.length;
  }
}

export const cartStore = new CartStore();
export default cartStore;

