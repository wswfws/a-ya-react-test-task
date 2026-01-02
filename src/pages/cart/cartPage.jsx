import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../stores/StoresContext';
import useAppRoutes from '../../app/use-app-routes';
import {getSizes} from "../../services/api";
import {Link} from "react-router-dom";

const CartPageInner = () => {
  const {cartStore} = useContext(StoresContext);
  const {getProductPath} = useAppRoutes();
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    getSizes().then(setSizes);
  }, [])

  const items = cartStore.items;

  if (items.length === 0) {
    return <main style={{padding: 16}}>Корзина пуста</main>
  }

  return (
    <main style={{padding: 16}}>
      <h1>Корзина</h1>
      <div className="cart-list">
        {items.map((it) => {

          const img = it.imageUrl || it.product?.colors?.[0]?.images?.[0];
          const size = sizes?.find(s => s.id === it.sizeId)?.label || it.sizeId;
          const color = it.product.colors.find(c => c.id === it.colorId)?.name || it.colorId;

          return (
            <div key={`${it.productId}-${it.colorId}-${it.sizeId}`} style={{border: '1px solid #ddd', padding: 8, marginBottom: 8, display: 'flex', gap: 12}}>
              {img && (
                <Link to={getProductPath(it.productId)}>
                  <img src={img} alt={it.product?.name || ''} style={{width: 120, height: 'auto', objectFit: 'cover'}} />
                </Link>
              )}

              <div style={{flex: 1}}>
                <a href={getProductPath(it.productId)}>
                  <h2>{it.product.name}</h2>
                </a>
                <div>Цвет: {color}</div>
                <div>Размер: {size}</div>
                <div style={{marginTop: 8}}>
                  <button onClick={() => cartStore.removeItem(it)}>Удалить</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

const CartPage = observer(CartPageInner);
export default CartPage;

