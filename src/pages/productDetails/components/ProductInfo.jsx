export default function ProductInfo({product, selectedColor}) {
  if (!product) return null;

  const price = selectedColor ? selectedColor.price : (product.colors && product.colors[0] ? product.colors[0].price : '');
  const description = selectedColor ? selectedColor.description : product.description || '';

  return (
    <div className="product-details__info">
      <h1 className="product-details__title">{product.name}</h1>
      <div className="product-details__price">{price} ₽</div>
      <div className="product-details__description">{description}</div>
    </div>
  );
}

