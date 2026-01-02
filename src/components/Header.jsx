import React from 'react';
import {Link} from 'react-router-dom';
import CartButton from './CartButton';
import './header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <Link to="/" className="brand-link">Магазин</Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/cart" className="nav-link">Корзина</Link>
        </nav>
        <div className="header-actions">
          <CartButton />
        </div>
      </div>
    </header>
  )
}

