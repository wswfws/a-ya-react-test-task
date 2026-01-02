import {useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_CONFIG} from "../../config/route-config";
import useProductDetails from "./useProductDetails";
import { getProductColor } from '../../services/api';

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

  const onAddToCart = async () => {
    if (!selectedColorId || !selectedSizeId) {
      // просто игнорируем действие если не выбраны параметры
      return;
    }

    // пытаемся получить информацию о цвете через API чтобы взять картинку
    let imageUrl = undefined;
    try {
      const color = await getProductColor(product.id, selectedColorId);
      if (color && Array.isArray(color.images) && color.images.length > 0) {
        imageUrl = color.images[0];
      }
    } catch (e) {
      // если не удалось — продолжаем без картинки
      console.error('Failed to load product color for cart image', e);
    }

    cartStore.addItem({product, colorId: selectedColorId, sizeId: selectedSizeId, imageUrl});
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