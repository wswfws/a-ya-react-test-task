import './styles.css'
import useAppRoutes from "../../app/use-app-routes";

/**
 * @param {Product} product
 * @returns {JSX.Element}
 * @constructor
 */
export default function Product({product}) {

  const {getProductPath} = useAppRoutes();

  return (
    <a className={"product"} href={getProductPath(product.id)}>
      <h2 className={"product__name"}>{product.name}</h2>
      <img className={"product__image"} alt={product.name} src={getProductImage(product)}/>
    </a>
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