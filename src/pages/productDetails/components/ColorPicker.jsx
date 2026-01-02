export default function ColorPicker({colors = [], selectedColorId, onSelectColor}) {
  return (
    <div className="product-details__colors">
      <div className="product-details__colors_label">Цвет:</div>
      <div className="product-details__colors_list">
        {colors.map((color) => (
          <button
            key={color.id}
            className={"color-swatch " + (color.id === selectedColorId ? 'color-swatch--selected' : '')}
            onClick={() => onSelectColor(color.id)}
            aria-pressed={color.id === selectedColorId}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
}
