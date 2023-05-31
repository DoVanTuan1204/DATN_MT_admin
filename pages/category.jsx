import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import CategoryAPI from "@/src/api/category";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Category = () => {
  const [listCategory, setListCategory] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [paging, setPaging] = useState();
  const router = useRouter();

  const fetchListCategory = async () => {
    const data = await CategoryAPI.getListCategory({ page: paging });
    setPageCount(Math.ceil(data.data.count / 10));
    setListCategory(data.data.results);
  };

  useEffect(() => {
    fetchListCategory();
  }, [paging]);

  const getDetailSupplier = async (id) => {
    router.push("/category/edit/" + id);
  };

  const deleteSupplier = async (id) => {
    if (confirm("Xoá sản phẩm này ?") === true) {
      await CategoryAPI.deleteCategory(id);
      fetchListCategory();
      alert("Xoá thành công");
    }
  };

  const handleChangePage = async (data) => {
    let page = data.selected + 1;
    setPaging(page);
  };

  return (
    <Layout>
      <h1>Loại hàng hoá</h1>
      <button
        onClick={() => {
          router.push("/category/new");
        }}
        className="bg-green-700 text-white py-2 px-2 rounded-md mb-3">
        Thêm mới loại hàng
      </button>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td className="w-1/3">id</td>
            <td className="w-1/3">Tên</td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {listCategory?.map((data, index) => (
            <tr key={index}>
              <td className="">{data?.id}</td>
              <td className="">{data?.ten}</td>
              <td className="flex flex-row">
                <button
                  onClick={() => getDetailSupplier(data.id)}
                  className="bg-blue-900 text-white">
                  <IconEdit />
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteSupplier(data.id);
                  }}
                  className="bg-blue-900 text-white">
                  <IconTrash />
                  Delete
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

export default Category;
