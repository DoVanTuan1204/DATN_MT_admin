import CategoryForm from "@/components/CategoryForm";
import Layout from "@/components/Layout";
import React from "react";

const NewCategory = () => {
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Thêm mới Loại hàng hoá</h1>
      <CategoryForm />
    </Layout>
  );
};

export default NewCategory;
