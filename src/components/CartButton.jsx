import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../stores/StoresContext';
import {ROUTE_CONFIG} from '../config/route-config';

const CartButtonInner = () => {
  const {cartStore} = useContext(StoresContext);
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(ROUTE_CONFIG.CART)} style={{position: 'fixed', right: 16, top: 16}}>
      Корзина ({cartStore.count})
    </button>
  )
}

export const CartButton = observer(CartButtonInner);
export default CartButton;

