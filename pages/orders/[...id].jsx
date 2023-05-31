import Layout from "@/components/Layout";
import OrderAPI from "@/src/api/oder";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = () => {
  const router = useRouter();
  const idOrder = router?.query?.id[0];
  console.log(router?.query?.id);
  const [detailOrder, setDetailOrder] = useState();

  const fetchDetailOrder = async () => {
    try {
      const data = await OrderAPI.getDetailOrder(idOrder);
      console.log(data);
      setDetailOrder(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailOrder();
  }, [idOrder]);

  console.log(detailOrder);
  return (
    <div>
      <Layout>
        <div>
          <h1 className="text-blue-900 text-xl">Chi tiết đơn hàng</h1>
          <table className="basic">
            <thead>
              <tr>
                <td>Tên sản phẩm</td>
                <td>Số lượng</td>
                <td>Đơn giá</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{detailOrder?.sanpham}</td>
                <td>{detailOrder?.soluong}</td>
                <td>{detailOrder?.dongia}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default Order;
