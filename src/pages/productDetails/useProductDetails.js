import {useEffect, useMemo, useState} from "react";
import {getProduct, getSizes, getProductColor} from "../../services/api";

/**
 * @param {string} id
 * @return {object} - { loading, product, sizesList, selectedColorId, setSelectedColorId, selectedSizeId, setSelectedSizeId, currentImageIndex, setCurrentImageIndex, imagesForSelectedColor, sizesWithAvailability, selectedColor }
 */
export default function useProductDetails(id) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [sizesList, setSizesList] = useState([]);

  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedColor, setSelectedColor] = useState(undefined);
  const [colorLoading, setColorLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getProduct(id), getSizes()])
      .then(([prod, sizes]) => {
        if (!mounted) return;
        setProduct(prod);
        setSizesList(sizes || []);
        if (prod && prod.colors && prod.colors.length > 0) {
          setSelectedColorId(prod.colors[0].id);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!product || selectedColorId == null) {
      setSelectedColor(undefined);
      return;
    }

    let mounted = true;
    setColorLoading(true);
    getProductColor(product.id, selectedColorId)
      .then((color) => {
        if (!mounted) return;
        setSelectedColor(color);
        setSelectedSizeId(null);
        setCurrentImageIndex(0);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setSelectedColor(undefined);
      })
      .finally(() => mounted && setColorLoading(false));

    return () => {
      mounted = false;
    };
  }, [product, selectedColorId]);

  const imagesForSelectedColor = selectedColor ? (selectedColor.images || []) : [];

  const sizesWithAvailability = useMemo(() => {
    return sizesList.map((size) => ({
      ...size,
      available: !!(selectedColor && Array.isArray(selectedColor.sizes) && selectedColor.sizes.includes(size.id)),
    }));
  }, [sizesList, selectedColor]);

  return {
    loading,
    product,
    sizesList,
    selectedColorId,
    setSelectedColorId,
    selectedSizeId,
    setSelectedSizeId,
    currentImageIndex,
    setCurrentImageIndex,
    imagesForSelectedColor,
    sizesWithAvailability,
    selectedColor,
    colorLoading,
  };
}