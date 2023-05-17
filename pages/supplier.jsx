import Layout from "@/components/Layout";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import SupplierAPI from "@/src/api/supplier";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [listSupplier, setListSupplier] = useState();
  const [a, setA] = useState();
  const [pageNumber, setPageNumber] = useState([]);
  const [countPage, setCountPage] = useState();
  const [paging, setPaging] = useState(1);

  const fetchListSupplier = async () => {
    const data = await SupplierAPI.getListSupplier({ page: paging });
    setListSupplier(data.data.results);
    if (data.data.count % 10 !== 0)
      setCountPage(Math.floor(data.data.count / 10) + 1);
    setA(data.data.count);
  };

  useEffect(() => {
    fetchListSupplier();
  }, [paging]);
  useEffect(() => {
    if (pageNumber.length === 0) {
      setArrayPage();
    }
  });
  const setArrayPage = () => {
    for (let i = 1; i <= countPage; i++) {
      setPageNumber((oldArray) => [...oldArray, i]);
    }
  };
  const pagination = (number) => {
    setPaging(number);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      diachi: "",
      sdt: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await SupplierAPI.createSupplier(values);
      fetchListSupplier();
      resetForm();
    },
  });

  const setValueToInput = (data) => {
    formik.values.id = data.id;
    formik.values.name = data.name;
    formik.values.diachi = data.diachi;
    formik.values.sdt = data.sdt;
    console.log(formik.values.id);
  };

  const deleteSupplier = async (id) => {
    if (confirm("Delete this product??") === true) {
      await SupplierAPI.deleteSupplier(id);
      fetchListSupplier();
      alert("Delete success");
    } else {
    }
  };
  return (
    <Layout>
      <h1>Supplier</h1>
      <label htmlFor="">Create new supplier</label>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          defaultValue={formik.values.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Supplier name"
        />
        <input
          type="text"
          value={formik.values.diachi}
          name="diachi"
          onChange={formik.handleChange}
          placeholder="Supplier Address"
        />
        <input
          type="text"
          value={formik.values.sdt}
          name="sdt"
          onChange={formik.handleChange}
          placeholder="Supplier Phone number"
        />
        <button
          className="bg-blue-900 text-white px-4 py-1 rounded-sm shadow-sm"
          type="submit">
          Save
        </button>
      </form>

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
                  onClick={() => setValueToInput(data)}
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

export default Categories;
