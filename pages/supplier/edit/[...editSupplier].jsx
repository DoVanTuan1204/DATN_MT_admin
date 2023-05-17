import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditSupplier = () => {
  const [detailSupplier, setDetailSupplier] = useState();
  const router = useRouter();
  const { editSupplier } = router.query;
  console.log({ editSupplier });
  const fetchDetailSupplier = async () => {
    const data = await SupplierAPI.getDetailSupplier(editSupplier[0]);
    setDetailSupplier(data.data);
  };
  console.log(detailSupplier);
  useEffect(() => {
    fetchDetailSupplier();
  }, [editSupplier[0]]);
  return (
    <Layout>
      <h1 className="text-blue-900 text-xl">Edit product</h1>
      {detailSupplier && <SupplierForm supplier={detailSupplier} />}
    </Layout>
  );
};

export default EditSupplier;
