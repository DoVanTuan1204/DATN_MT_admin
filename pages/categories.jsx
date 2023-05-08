import Layout from "@/components/Layout";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import React from "react";

const Categories = () => {
  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="">Create new category</label>
      <input type="text" placeholder="Category name" />
      <button className=".btn-default bg-blue-900 text-white px-2 py-1 rounded-sm">
        Save
      </button>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Name</td>
            <td>Sub name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tuan 123</td>
            <td>Tuan 123</td>
            <td>
              <button>
                <IconEdit />
                Edit
              </button>

              <button>
                <IconTrash />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
