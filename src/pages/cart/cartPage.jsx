import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../stores/StoresContext';
import useAppRoutes from '../../app/use-app-routes';
import {getSizes} from "../../services/api";
import {Link} from "react-router-dom";

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="14">No image</text></svg>';

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

          const img = it.imageUrl || it.product?.colors?.[0]?.images?.[0] || PLACEHOLDER;
          const size = sizes?.find(s => s.id === it.sizeId)?.label || it.sizeId;
          const colorObj = it.product.colors.find(c => c.id === it.colorId);
          const color = colorObj?.name || it.colorId;
          const price = colorObj?.price || it.product.colors?.[0]?.price || '';

          return (
            <div key={`${it.productId}-${it.colorId}-${it.sizeId}`} style={{border: '1px solid #ddd', padding: 8, marginBottom: 8, display: 'flex', gap: 12}}>
              <Link to={getProductPath(it.productId)} style={{display: 'block'}}>
                <img src={img} alt={it.product?.name || ''} style={{width: 120, height: 120, objectFit: 'cover', background: '#fff'}} />
              </Link>

              <div style={{flex: 1}}>
                <Link to={getProductPath(it.productId)} style={{textDecoration: 'none', color: 'inherit'}}>
                  <h2 style={{margin: 0}}>{it.product.name} <small style={{marginLeft: 8, color: '#666'}}>{price ? price + ' ₽' : ''}</small></h2>
                </Link>
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

