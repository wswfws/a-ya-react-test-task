import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../stores/StoresContext';
import useAppRoutes from '../../app/use-app-routes';

const CartPageInner = () => {
  const {cartStore} = useContext(StoresContext);
  const {getProductPath} = useAppRoutes();

  const items = cartStore.items;

  if (items.length === 0) {
    return <main style={{padding: 16}}>Корзина пуста</main>
  }

  return (
    <main style={{padding: 16}}>
      <h1>Корзина</h1>
      <div className="cart-list">
        {items.map((it) => (
          <div key={`${it.productId}-${it.colorId}-${it.sizeId}`} style={{border: '1px solid #ddd', padding: 8, marginBottom: 8}}>
            <a href={getProductPath(it.productId)}>
              <h2>{it.product.name}</h2>
            </a>
            <div>Цвет: {it.product.colors.find(c => c.id === it.colorId)?.name || it.colorId}</div>
            <div>Размер: {it.sizeId}</div>
            <button onClick={() => cartStore.removeItem(it)}>Удалить</button>
          </div>
        ))}
      </div>
    </main>
  )
}

const CartPage = observer(CartPageInner);
export default CartPage;

