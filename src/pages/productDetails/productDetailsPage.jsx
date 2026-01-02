import {useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_CONFIG} from "../../config/route-config";
import useProductDetails from "./useProductDetails";

import ProductInfo from './components/ProductInfo';
import ColorPicker from './components/ColorPicker';
import ImageGallery from './components/ImageGallery';
import SizeSelector from './components/SizeSelector';
import './styles.css';
import {StoresContext} from '../../stores/StoresContext';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const {cartStore} = useContext(StoresContext);

  const {
    loading,
    product,
    selectedColorId,
    setSelectedColorId,
    selectedSizeId,
    setSelectedSizeId,
    currentImageIndex,
    setCurrentImageIndex,
    imagesForSelectedColor,
    sizesWithAvailability,
    selectedColor,
  } = useProductDetails(productId);

  if (loading) {
    return <>Loading...</>;
  }

  if (!productId || !product) {
    return navigate(ROUTE_CONFIG.WILDCARD);
  }

  const onAddToCart = () => {
    if (!selectedColorId || !selectedSizeId) {
      // просто игнорируем действие если не выбраны параметры
      return;
    }
    cartStore.addItem({product, colorId: selectedColorId, sizeId: selectedSizeId});
  }

  return <main className="product-details">
    <ImageGallery images={imagesForSelectedColor} currentIndex={currentImageIndex} onChangeIndex={setCurrentImageIndex} />

    <div>
      <ProductInfo product={product} selectedColor={selectedColor} selectedSize={selectedSizeId} />
      <ColorPicker colors={product.colors} selectedColorId={selectedColorId} onSelectColor={setSelectedColorId} />
      <SizeSelector sizes={sizesWithAvailability} selectedSizeId={selectedSizeId} onSelectSize={setSelectedSizeId} />

      <div style={{marginTop: 12}}>
        <button onClick={onAddToCart} disabled={!selectedColorId || !selectedSizeId}>Добавить в корзину</button>
      </div>
    </div>
  </main>

}