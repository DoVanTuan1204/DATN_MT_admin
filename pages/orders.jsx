import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import OrderAPI from "@/src/api/oder";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IconEdit from "@/components/icons/IconEdit";

const Orders = () => {
  const [listOrder, setListOrder] = useState();

  const [pageCount, setPageCount] = useState(0);
  const [paging, setPaging] = useState();

  const fetchListOrder = async () => {
    try {
      const data = await OrderAPI.getListOrder({ page: paging });
      setListOrder(data?.data?.results);
      setPageCount(Math.ceil(data?.data?.count / 10));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchListOrder();
  }, [paging]);
  console.log(listOrder);
  const handleChangePage = async (data) => {
    let page = data?.selected + 1;
    setPaging(page);
  };

  const router = useRouter();

  const updateOrder = async () => {
    try {
      const res = await OrderAPI.updateOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Đơn hàng</h1>
      <table className="basic">
        <thead>
          <tr>
            <td>Tên khách hàng</td>
            <td>Số điện thoại</td>
            <td>Thành tiền</td>
            <td>Trạng thái</td>
            <td>Ngày đặt</td>
            <td>Địa chỉ</td>
          </tr>
        </thead>
        <tbody>
          {listOrder?.map((data, index) => (
            <tr key={index}>
              <td className="">{data?.ten_nhan_hang}</td>
              <td className="">{data?.sdtgiaohang}</td>
              <td className="">{data?.thanhtien}</td>
              <td
                onClick={() => {
                  updateOrder();
                }}
                className="">
                {data?.trangthai}
              </td>
              <td className="">{data?.ngaydat}</td>
              <td className="">{data?.diachidathang}</td>
              <button
                onClick={() => {
                  router.push("/orders/" + data?.id);
                }}
                className="bg-blue-900 text-white">
                Xem chi tiết
              </button>
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

export default Orders;
