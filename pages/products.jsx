import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import ProductAPI from "@/src/api/product";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [listProduct, setListProduct] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [paging, setPaging] = useState();

  const fetchListProduct = async () => {
    const data = await ProductAPI.getListProduct({ page: paging });
    setListProduct(data.data.results);
    setPageCount(Math.ceil(data.data.count / 10));
  };
  useEffect(() => {
    fetchListProduct();
  }, [paging]);

  const deleteProduct = async (id) => {
    if (confirm("Delete this product??") === true) {
      await ProductAPI.deleteProduct(id);
      fetchListProduct();
      alert("Delete success");
    } else {
    }
  };

  const handleChangePage = async (data) => {
    let page = data.selected + 1;
    setPaging(page);
  };
  return (
    <Layout>
      <Link
        className="bg-green-700 text-white py-2 px-2 rounded-md"
        href={"/products/new"}>
        Thêm mới sản phẩm
      </Link>
      <table className="basic mt-6">
        <thead>
          <tr>
            <td>Tên sản phẩm</td>
            <td>Giá sản phẩm</td>
            <td>Sản phẩm còn lại</td>
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
                  Sửa
                </Link>
                <button
                  onClick={() => deleteProduct(data.id)}
                  className="bg-blue-900 text-white">
                  <IconTrash />
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handleChangePage}
        previousLabel="< previous"
        nextLabel="next >"
        marginPagesDisplayed={2}
        pageClassName="border px-2 py-1"
        previousClassName="border px-2 py-1"
        nextClassName="border px-2 py-1"
        nextLinkClassName="page-link"
        breakLabel="..."
        containerClassName="mt-2 flex flex-row gap-2 justify-end items-center"
        activeClassName="bg-blue-900 text-white"
        renderOnZeroPageCount={null}
      />
    </Layout>
  );
};

export default Products;
