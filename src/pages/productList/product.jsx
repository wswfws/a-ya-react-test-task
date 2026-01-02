import './styles.css'
import useAppRoutes from "../../app/use-app-routes";
import { Link } from 'react-router-dom';

/**
 * @param {Product} product
 */
export default function Product({product}) {

  const {getProductPath} = useAppRoutes();

  return (
    <Link className={"product"} to={getProductPath(product.id)}>
      <h2 className={"product__name"}>{product.name}</h2>
      <img className={"product__image"} alt={product.name} src={getProductImage(product)}/>
    </Link>
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