import CategoryAPI from "@/src/api/category";
import { phoneRegExp } from "@/src/api/constant/regex";
import ProductAPI from "@/src/api/product";
import axios from "axios";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const ProductForm = ({ product }) => {
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState(product?.rootImage || []);

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
      danhmuc: product?.danhmuc || 1,
    },
    validationSchema: Yup.object({
      ten: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      soluong: Yup.number().required("Required!"),
      giatien: Yup.string()
        .min(1, "Mininum 6 characters")
        .required("Required!"),
      mota: Yup.string()
        .min(6, "Mininum 6 characters")
        .max(50, "Maximum 50 characters")
        .required("Required!"),
      sdt: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(6, "Mininum 6 characters")
        .max(10, "Maximum 10 characters"),
    }),

    onSubmit: async (values) => {
      values.rootImage = images[0];
      if (!product) {
        await ProductAPI.createProduct(values);
      } else {
        values.id = product.id;
        await ProductAPI.updateProduct(values);
      }
      Router.push("/products");
    },
  });

  const uploadImages = async (ev, id) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages(res?.data?.links);
      console.log(res?.data);
    }
  };

  return (
    <>
      {
        <div className="mb-2 flex flex-wrap gap-1">
          {!!images?.length && (
            <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={images} alt="" className="rounded-lg" />
            </div>
          )}
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
            <div>Thêm ảnh mới</div>
            <input
              type="file"
              name="image"
              onChange={(ev) => {
                uploadImages(ev, product?.id);
              }}
              className="hidden"
            />
          </label>
        </div>
      }

      <form onSubmit={formik.handleSubmit}>
        <label>Tên sản phẩm</label>
        <input
          onChange={formik.handleChange}
          defaultValue={product?.ten}
          name="ten"
          value={formik?.values?.ten}
          type="text"
          placeholder="Tên sản phẩm"
        />
        {formik.errors.ten && formik.touched.ten && <p>{formik.errors.ten}</p>}

        <label>Mô tả</label>
        <textarea
          onChange={formik.handleChange}
          defaultValue={product?.mota}
          name="mota"
          value={formik?.values?.mota}
          type="text"
          placeholder="Mô tả"
        />
        {formik.errors.mota && formik.touched.mota && (
          <p>{formik.errors.mota}</p>
        )}

        <label>Giá cả</label>
        <input
          onChange={formik.handleChange}
          defaultValue={product?.giatien}
          name="giatien"
          value={formik?.values?.giatien}
          type="text"
          placeholder="Giá cả"
        />
        {formik.errors.giatien && formik.touched.giatien && (
          <p>{formik.errors.giatien}</p>
        )}

        <label>Số lượng</label>
        <input
          onChange={formik.handleChange}
          value={formik?.values?.soluong}
          defaultValue={product?.soluong}
          name="soluong"
          type="text"
          placeholder="Số lượng"
        />
        {formik.errors.soluong && formik.touched.soluong && (
          <p>{formik.errors.soluong}</p>
        )}

        <label htmlFor="danhmuc">Danh mục</label>

        <select
          name="danhmuc"
          defaultValue={product?.danhmuc}
          id="danhmuc"
          onChange={(e) => {
            formik.setFieldValue("danhmuc", e.target.value);
          }}>
          {category?.map((item, index) => (
            <option key={index} value={item.id || 1}>
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
    </>
  );
};

export default ProductForm;
