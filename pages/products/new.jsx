import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import React from "react";

const NewProducts = () => {
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Add new product</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProducts;
