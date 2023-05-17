import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import React from "react";

const NewSupplier = () => {
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Add new Supplier</h1>
      <SupplierForm />
    </Layout>
  );
};

export default NewSupplier;
