import Layout from "@/components/Layout";
import React from "react";
import { fakeData } from "@/fakeDataOrder";

const Orders = () => {
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <td>Name</td>
            <td>Paid</td>
            <td>Date</td>
            <td>Product</td>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.paid === false ? "No" : "Yes"}</td>
              <td>{data.date}</td>
              <td>{data.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
