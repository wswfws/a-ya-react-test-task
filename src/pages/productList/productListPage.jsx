import {useEffect, useState} from "react";
import {getProducts} from "../../services/api";
import Product from "./product";

export default function ProductListPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    }).catch((err) => {
      console.error(err);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>Loading...</> //todo loader
    )
  }

  return (
    <main className="product-list-page">
      <div className={"product-list-container"}>
        {products.map((product) => (
          <Product product={product}/>
        ))}
      </div>
    </main>
  )
}