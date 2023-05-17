import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import ProductAPI from "@/src/api/product";

const Products = () => {
  const [listProduct, setListProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  const [countPage, setCountPage] = useState();
  const [paging, setPaging] = useState(1);

  const fetchListProduct = async () => {
    const data = await ProductAPI.getListProduct({ page: paging });
    setListProduct(data.data.results);
    if (data.data.count % 10 === 0)
      setCountPage(Math.floor(data.data.count / 10));
      else
      setCountPage(Math.floor(data.data.count / 10) + 1);
    console.log(data.data);
  };
  useEffect(() => {
    fetchListProduct();
  }, [paging]);

  useEffect(() => {
    if (pageNumber.length === 0) {
      setArrayPage();
    }
  }, [listProduct]);

  const setArrayPage = () => {
    for (let i = 1; i <= countPage; i++) {
      setPageNumber((oldArray) => [...oldArray, i]);
    }
  };

  const deleteProduct = async (id) => {
    if (confirm("Delete this product??") === true) {
      await ProductAPI.deleteProduct(id);
      fetchListProduct();
      alert("Delete success");
    } else {
    }
  };
  const pagination = (number) => {
    setPaging(number);
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
            <td>Product price</td>
            <td>Product in stock</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((data, index) => (
            <tr key={index}>
              <td>{data.ten}</td>
              <td>{data.giatien} đ</td>
              <td>{data.soluong}</td>
              <td className="flex flex-row">
                <Link
                  className="bg-blue-900 text-white"
                  href={"/products/edit/" + data.id}>
                  <IconEdit />
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(data.id)}
                  className="bg-blue-900 text-white">
                  <IconTrash />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row gap-2 mt-3">
        {pageNumber.map((number, index) => (
          <button
            key={index}
            className={
              number === paging
                ? "cursor-pointer px-2 py-1 border rounded-lg bg-blue-900 text-white"
                : "cursor-pointer px-2 py-1 border rounded-lg"
            }
            onClick={() => {
              pagination(number);
            }}>
            {number}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Products;
