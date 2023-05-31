import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import React from "react";

const NewSupplier = () => {
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Thêm mới nhà cung cấp</h1>
      <SupplierForm />
    </Layout>
  );
};

export default NewSupplier;
