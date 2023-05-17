import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import ProductAPI from "@/src/api/product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const [detailProduct, setDetailProduct] = useState();
  const router = useRouter();
  const { editProduct } = router.query;
  const fetchDetailProduct = async () => {
    const data = await ProductAPI.getDetailProduct(editProduct[0]);
    setDetailProduct(data.data);
  };

  // call api
  useEffect(() => {
    fetchDetailProduct();
  }, [editProduct[0]]);
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Edit product</h1>
      {detailProduct && <ProductForm product={detailProduct} />}
    </Layout>
  );
};

export default EditProduct;
