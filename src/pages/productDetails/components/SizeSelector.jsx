export default function SizeSelector({sizes = [], selectedSizeId, onSelectSize}) {
  return (
    <div className="product-details__sizes">
      <div className="product-details__sizes_label">Размер:</div>
      <div className="product-details__sizes_list">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={"size-item " + (size.available ? '' : 'size-item--disabled') + (size.id === selectedSizeId ? ' size-item--selected' : '')}
            disabled={!size.available}
            onClick={() => size.available && onSelectSize(size.id)}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
