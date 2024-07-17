import React from "react";

export default function CartActions({
  selectAll,
  handleSelectAll,
  clearCart,
  selectedItems,
}) {
  return (
    <div className="flex flex-row bg-color-primary md:px-10 px-3 py-3 rounded-lg w-full justify-between items-center shadow-md">
      <div className="text-color-customRed font-bold flex flex-row gap-2 items-center">
        <input
          className="custom-checkbox"
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <h2>Pilih Semua</h2>
      </div>
      {selectedItems.length > 0 && (
        <button className="text-color-red font-bold" onClick={clearCart}>
          Hapus
        </button>
      )}
    </div>
  );
}
