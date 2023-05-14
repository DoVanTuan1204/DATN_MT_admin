import CategoryAPI from "@/src/api/category";
import ProductAPI from "@/src/api/product";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const ProductForm = ({ product }) => {
  const [category, setCategory] = useState([]);
  const fetchCategory = async () => {
    const data = await CategoryAPI.getListCategory();
    setCategory(data.data.results);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      ten: product?.ten || "",
      mota: product?.mota || "",
      giatien: product?.giatien || "",
      soluong: product?.soluong || "",
      danhmuc: product?.danhmuc || "",
    },
    onSubmit: async (values) => {
      if (product === undefined) await ProductAPI.createProduct(values);
      else await ProductAPI.updateProduct(values);
      Router.push("/products");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Product name</label>
      <input
        onChange={formik.handleChange}
        value={product?.ten}
        name="ten"
        type="text"
        placeholder="Product name"
      />
      <label>Description</label>
      <textarea
        onChange={formik.handleChange}
        value={product?.mota}
        name="mota"
        type="text"
        placeholder="Description"
      />
      <label>Price</label>
      <input
        onChange={formik.handleChange}
        value={product?.giatien}
        name="giatien"
        type="text"
        placeholder="Price"
      />
      <label>Quantity</label>
      <input
        onChange={formik.handleChange}
        value={product?.soluong}
        name="soluong"
        type="text"
        placeholder="Price"
      />
      <label htmlFor="danhmuc">Category</label>

      <select
        name="danhmuc"
        value={product?.danhmuc}
        id="danhmuc"
        onChange={(e) => {
          formik.setFieldValue("danhmuc", e.target.value);
        }}>
        {category?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.ten}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-900 text-white px-4 py-1 rounded-sm shadow-sm"
        type="submit">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
