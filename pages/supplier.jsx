import Layout from "@/components/Layout";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import SupplierAPI from "@/src/api/supplier";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [listSupplier, setListSupplier] = useState();
  const fetchListSupplier = async () => {
    const data = await SupplierAPI.getListSupplier();
    setListSupplier(data.data.results);
  };
  useEffect(() => {
    fetchListSupplier();
  }, []);
  console.log(listSupplier);
  return (
    <Layout>
      <h1>Supplier</h1>
      <label htmlFor="">Create new category</label>
      <input type="text" placeholder="Supplier name" />
      <input type="text" placeholder="Supplier Address" />
      <input type="text" placeholder="Supplier Phone number" />
      <button className=".btn-default bg-blue-900 text-white px-2 py-1 rounded-sm">
        Save
      </button>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Name</td>
            <td>Address</td>
            <td>Phone Number</td>
          </tr>
        </thead>
        <tbody>
          {listSupplier?.map((data, index) => (
            <tr key={index}>
              <td className="">{data.name}</td>
              <td className="">{data.diachi}</td>
              <td className="">{data.sdt}</td>
              <td className="flex flex-row">
                <button className="bg-blue-900 text-white">
                  <IconEdit />
                  Edit
                </button>
                <button onClick={() => {}} className="bg-blue-900 text-white">
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

export default Categories;
