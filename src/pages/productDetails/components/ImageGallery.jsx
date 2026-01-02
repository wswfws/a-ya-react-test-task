export default function ImageGallery({images = [], currentIndex = 0, onChangeIndex}) {
  if (!images || images.length === 0) {
    return <div className="product-details__gallery_placeholder">No images</div>;
  }

  const prev = () => onChangeIndex(Math.max(0, currentIndex - 1));
  const next = () => onChangeIndex(Math.min(images.length - 1, currentIndex + 1));

  return (
    <div className="product-details__gallery">
      <div className={"product-details__main-image-container"}>
        <button className="gallery__nav nav--prev" onClick={prev} disabled={currentIndex === 0} aria-label="prev">‹
        </button>
        <img className="product-details__main-image" src={images[currentIndex]} alt={`image-${currentIndex}`}/>
        <button className="gallery__nav nav--next" onClick={next} disabled={currentIndex === images.length - 1}
                aria-label="next">›
        </button>
      </div>

      <div className="product-details__thumbnails">
        {images.map((src, idx) => (
          <img
            key={idx}
            className={"thumbnail " + (idx === currentIndex ? 'thumbnail--active' : '')}
            src={src}
            alt={`thumb-${idx}`}
            onClick={() => onChangeIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

