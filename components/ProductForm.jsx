import CategoryAPI from "@/src/api/category";
import ImagesAPI from "@/src/api/images";
import ProductAPI from "@/src/api/product";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const ProductForm = ({ product }) => {
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);

  const fetchCategory = async () => {
    const data = await CategoryAPI.getListCategory();
    setCategory(data.data.results);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      ten: product?.ten,
      mota: product?.mota,
      giatien: product?.giatien,
      soluong: product?.soluong,
      danhmuc: product?.danhmuc,
    },
    onSubmit: async (values) => {
      if (!product) await ProductAPI.createProduct(values);
      else {
        values.id = product.id;
        await ProductAPI.updateProduct(values);
      }
      Router.push("/products");
    },
  });
  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = await ImagesAPI.createImages();
      console.log(data);
      // setImages((oldImages) => {
      //   return [...oldImages, ...res.data.links];
      // });
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Product name</label>
      <input
        onChange={formik.handleChange}
        defaultValue={product?.ten}
        name="ten"
        type="text"
        placeholder="Product name"
      />
      <label>Description</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {!!images?.length &&
          images.map((link) => (
            <div
              key={link}
              className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        {/* {isUploading && <div className="h-24 flex items-center"></div>} */}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <textarea
        onChange={formik.handleChange}
        defaultValue={product?.mota}
        name="mota"
        type="text"
        placeholder="Description"
      />
      <label>Price</label>
      <input
        onChange={formik.handleChange}
        defaultValue={product?.giatien}
        name="giatien"
        type="text"
        placeholder="Price"
      />
      <label>Quantity</label>
      <input
        onChange={formik.handleChange}
        defaultValue={product?.soluong}
        name="soluong"
        type="text"
        placeholder="Price"
      />
      <label htmlFor="danhmuc">Category</label>

      <select
        name="danhmuc"
        defaultValue={product?.danhmuc}
        id="danhmuc"
        onChange={(e) => {
          formik.setFieldValue("danhmuc", e.target.value);
        }}>
        <option value="" disabled>
          Uncategorized
        </option>
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
