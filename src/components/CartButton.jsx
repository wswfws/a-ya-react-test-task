import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../stores/StoresContext';
import {ROUTE_CONFIG} from '../config/route-config';

const CartButtonInner = () => {
  const {cartStore} = useContext(StoresContext);

  return (
    <Link to={ROUTE_CONFIG.CART} className="cart-link">
      Корзина ({cartStore.count})
    </Link>
  )
}

export const CartButton = observer(CartButtonInner);
export default CartButton;
