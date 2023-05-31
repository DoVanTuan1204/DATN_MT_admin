import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import CategoryAPI from "@/src/api/category";

const CategoryForm = ({ category }) => {
  console.log(category);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      ten: category?.ten,
    },
    validationSchema: Yup.object({
      ten: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
    }),
    onSubmit: async (values) => {
      if (!category) await CategoryAPI.createCategory(values);
      else if (category) {
        values.id = category?.id;
        await CategoryAPI.updateCategory(values);
      }
      router.back();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="ten"
        defaultValue={category?.ten}
        value={formik?.values?.ten}
        onChange={formik.handleChange}
        placeholder="Tên loại hàng"
      />
      {formik.errors.ten && formik.touched.ten && <p>{formik.errors.ten}</p>}

      <button
        onClick={() => {
          router.back();
        }}
        className=" text-blue-900 mr-2 border border-blue-900 px-4 py-1 rounded-sm shadow-sm">
        Cancel
      </button>
      <button
        className="bg-blue-900 text-white px-4 py-1 rounded-sm shadow-sm"
        type="submit">
        Save
      </button>
    </form>
  );
};

export default CategoryForm;
