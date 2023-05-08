import React from "react";

const ProductForm = () => {
  return (
    <form>
      <label>Product name</label>
      <input type="text" placeholder="Product name" />
      <label>Description</label>
      <textarea type="text" placeholder="Description" />
      <label>Price</label>
      <input type="text" placeholder="Price" />
      <button
        className="bg-blue-900 text-white px-4 py-1 rounded-sm shadow-sm"
        type="submit">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
