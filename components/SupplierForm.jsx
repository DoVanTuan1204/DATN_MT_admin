import React from "react";
import { useFormik } from "formik";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { phoneRegExp } from "@/src/api/constant/regex";

const SupplierForm = ({ supplier }) => {
  const router = useRouter();

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    return errors;
  };

 
  const formik = useFormik({
    initialValues: {
      name: supplier?.name,
      diachi: supplier?.diachi,
      sdt: supplier?.sdt,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      diachi: Yup.string()
        .min(6, "Mininum 6 characters")
        .max(50, "Maximum 50characters")
        .required("Required!"),
      sdt: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    }),
    onSubmit: async (values) => {
      if (!supplier) await SupplierAPI.createSupplier(values);
      else if (supplier) {
        values.id = supplier?.id;
        await SupplierAPI.updateSupplier(values);
      }
      router.back();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="name"
        defaultValue={supplier?.name}
        value={formik?.values?.name}
        onChange={formik.handleChange}
        placeholder="Supplier name"
      />
      {formik.errors.name && formik.touched.name && <p>{formik.errors.name}</p>}
      <input
        type="text"
        defaultValue={supplier?.diachi}
        name="diachi"
        onChange={formik.handleChange}
        placeholder="Supplier Address"
      />
      {formik.errors.diachi && formik.touched.diachi && (
        <p>{formik.errors.diachi}</p>
      )}

      <input
        type="text"
        defaultValue={supplier?.sdt}
        name="sdt"
        onChange={formik.handleChange}
        placeholder="Supplier Phone number"
      />
      {formik.errors.sdt && formik.touched.sdt && <p>{formik.errors.sdt}</p>}

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

export default SupplierForm;
