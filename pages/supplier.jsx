import Layout from "@/components/Layout";
import SupplierForm from "@/components/SupplierForm";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import SupplierAPI from "@/src/api/supplier";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Categories = () => {
  const [listSupplier, setListSupplier] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [paging, setPaging] = useState();
  const router = useRouter();

  const fetchListSupplier = async () => {
    const data = await SupplierAPI.getListSupplier({ page: paging });
    setPageCount(Math.ceil(data.data.count / 10));
    setListSupplier(data.data.results);
  };

  useEffect(() => {
    fetchListSupplier();
  }, [paging]);

  const getDetailSupplier = async (id) => {
    router.push("/supplier/edit/" + id);
  };

  const deleteSupplier = async (id) => {
    if (confirm("Delete this product??") === true) {
      await SupplierAPI.deleteSupplier(id);
      fetchListSupplier();
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
      <h1>Supplier</h1>
      <button
        onClick={() => {
          router.push("/supplier/new");
        }}
        className="bg-green-700 text-white py-2 px-2 rounded-md mb-3">
        Add new supplier
      </button>
      <table className="basic mt-4 overflow-hidden">
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

export default Categories;
