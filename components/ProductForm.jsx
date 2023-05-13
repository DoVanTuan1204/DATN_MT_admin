import CategoryAPI from '@/src/api/category'
import ProductAPI from '@/src/api/product'
import { useFormik } from 'formik'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

const ProductForm = () => {
  const [category, setCategory] = useState([])

  const fetchCategory = async () => {
    const data = await CategoryAPI.getListCategory()
    setCategory(data.data.results)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const formik = useFormik({
    initialValues: {
      ten: '',
      mota: '',
      giatien: '',
      soluong: '',
      danhmuc: '',
    },
    onSubmit: async (values) => {
      await ProductAPI.createProduct(values)
      Router.push('/product')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Product name</label>
      <input
        onChange={formik.handleChange}
        name="ten"
        type="text"
        placeholder="Product name"
      />
      <label>Description</label>
      <textarea
        onChange={formik.handleChange}
        name="mota"
        type="text"
        placeholder="Description"
      />
      <label>Price</label>
      <input
        onChange={formik.handleChange}
        name="giatien"
        type="text"
        placeholder="Price"
      />
      <label>Quantity</label>
      <input
        onChange={formik.handleChange}
        name="soluong"
        type="text"
        placeholder="Price"
      />
      <label htmlFor="danhmuc">Category</label>

      <select
        name="danhmuc"
        id="danhmuc"
        onChange={(e) => {
          formik.setFieldValue('danhmuc', e.target.value)
        }}
      >
        {category?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.ten}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-900 text-white px-4 py-1 rounded-sm shadow-sm"
        type="submit"
      >
        Save
      </button>
    </form>
  )
}

export default ProductForm
