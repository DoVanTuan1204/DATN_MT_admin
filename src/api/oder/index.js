import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";
export const ORDER_ENDPOINT = {
  GET_LIST_ORDER: `${v1}/shop/hoa_don/`,
  GET_DETAIL_ORDER: (id) => `${v1}/shop/chitiet_hoadon/` + id,
  DELETE_ORDER: (id) => `${v1}/shop/chitiet_hoadon/` + id + "/",
  UPDATE_ORDER: `${v1}/shop/hoa_don/8/capnhat_trangthai/`,
};

export default class OrderAPI {
  static getListOrder = (payload) =>
    appAxios.get(ORDER_ENDPOINT.GET_LIST_ORDER, payload);

  static updateOrder = (payload) =>
    appAxios.get(ORDER_ENDPOINT.UPDATE_ORDER, payload);

  static getDetailOrder = (payload) =>
    appAxios.get(ORDER_ENDPOINT.GET_DETAIL_ORDER(payload), payload);

  static deleteOrder = (payload) =>
    appAxios.delete(ORDER_ENDPOINT.DELETE_ORDER(payload), payload);
}
