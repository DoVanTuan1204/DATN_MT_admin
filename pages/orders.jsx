import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { fakeData } from "@/fakeDataOrder";
import OrderAPI from "@/src/api/oder";

const Orders = () => {
  const [listOrder, setListOrder] = useState();

  const fetchListOrder = async () => {
    const data = await OrderAPI.getListOrder();
    setListOrder(data.data.results);
    console.log(data.data.results);
  };
  useEffect(() => {
    fetchListOrder();
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <td>Phone Number</td>
            <td>Paid</td>
            <td>Date</td>
            <td>Address</td>
          </tr>
        </thead>
        <tbody>
          {listOrder?.map((data, index) => (
            <tr key={index}>
              <td className="">{data.sdtgiaohang}</td>
              <td className="">{data.thanhtien}</td>
              <td className="">{data.ngaydat}</td>
              <td className="">{data.diachidathang}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
