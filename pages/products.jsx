import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

import { fakeData } from "@/fakeData";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";

const Products = () => {
  const deleteProduct = () => {
    if (confirm("Delete this product!!") == true) {
      alert("OK");
    } else {
    }
  };

  return (
    <Layout>
      <Link
        className="bg-green-700 text-white py-2 px-2 rounded-md"
        href={"/products/new"}>
        Add new products
      </Link>
      <table className="basic mt-6">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td className="flex flex-row">
                <Link
                  className="bg-blue-900 text-white"
                  href={"/products/edit/" + data.id}>
                  <IconEdit />
                  Edit
                </Link>
                <button
                  onClick={deleteProduct}
                  className="bg-blue-900 text-white">
                  <IconTrash />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
