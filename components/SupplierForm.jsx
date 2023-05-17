import React from "react";
import { useFormik } from "formik";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";

const SupplierForm = (supplier) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: supplier?.supplier.name,
      diachi: supplier?.supplier.diachi,
      sdt: supplier?.supplier.sdt,
    },
    onSubmit: async (values) => {
      if (!supplier) await SupplierAPI.createSupplier(values);
      else {
        values.id = supplier?.supplier.id;
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
        defaultValue={supplier?.supplier.name}
        onChange={formik.handleChange}
        placeholder="Supplier name"
      />
      <input
        type="text"
        defaultValue={supplier?.supplier.diachi}
        name="diachi"
        onChange={formik.handleChange}
        placeholder="Supplier Address"
      />
      <input
        type="text"
        defaultValue={supplier?.supplier.sdt}
        name="sdt"
        onChange={formik.handleChange}
        placeholder="Supplier Phone number"
      />
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
