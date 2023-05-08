import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  // call api
  useEffect(() => {}, [id]);
  return (
    <Layout>
      EditProduct
      <ProductForm />
    </Layout>
  );
};

export default EditProduct;
