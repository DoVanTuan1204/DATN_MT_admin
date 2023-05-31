import CategoryForm from "@/components/CategoryForm";
import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import CategoryAPI from "@/src/api/category";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditSupplier = () => {
  const [detailCategory, setDetailCategory] = useState();
  const router = useRouter();
  const { editCategory } = router.query;
  const fetchDetailSupplier = async () => {
    const data = await CategoryAPI.getDetailCategory(editCategory[0]);
    setDetailCategory(data.data);
  };
  console.log(detailCategory);
  useEffect(() => {
    fetchDetailSupplier();
  }, [editCategory[0]]);
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Chỉnh sửa nhầ cung cấp</h1>
      {detailCategory && <CategoryForm category={detailCategory} />}
    </Layout>
  );
};

export default EditSupplier;
