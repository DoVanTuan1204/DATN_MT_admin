import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import ProductAPI from "@/src/api/product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const [detailProduct, setDetailProduct] = useState();
  const router = useRouter();
  const { editProduct } = router.query;
  const fetchListProduct = async () => {
    const data = await ProductAPI.getDetailProduct(editProduct[0]);
    setDetailProduct(data.data);
  };

  // call api
  useEffect(() => {
    fetchListProduct();
  }, [editProduct[0]]);
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Add new product</h1>
      <ProductForm product={detailProduct} />
    </Layout>
  );
};

export default EditProduct;
