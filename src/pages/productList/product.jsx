/**
 * @param {Product} product
 * @returns {JSX.Element}
 * @constructor
 */
export default function Product({product}) {
  return (
    <div className={"product"}>
      <h2 className={"product__name"}>{product.name}</h2>
      <img className={"product__image"} alt={product.name} src={getProductImage(product)}/>
    </div>
  )
}

/**
 * @param {Product} product
 * @returns {string} - src картинки
 * @constructor
 */
function getProductImage(product) {
  return product.colors[0]?.images[0];
}