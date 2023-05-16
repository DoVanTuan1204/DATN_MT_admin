import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";
export const ORDER_ENDPOINT = {
  GET_LIST_ORDER: `${v1}/shop/hoa_don/`,
  DELETE_ORDER: (id) => `${v1}/shop/hoa_don/` + id,
};

export default class OrderAPI {
  static getListOrder = (payload) =>
    appAxios.get(ORDER_ENDPOINT.GET_LIST_ORDER, payload);
}
