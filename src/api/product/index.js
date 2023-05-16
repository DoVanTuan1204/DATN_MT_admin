import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";

export const PRODUCT_ENDPOINT = {
  GET_LIST_PRODUCT: `${v1}/shop/sanpham/`,
  GET_DETAIL_PRODUCT: (id) => `${v1}/shop/sanpham/` + id,
  CREATE_PRODUCT: `${v1}/shop/sanpham/`,
  DELETE_PRODUCT: (id) => `${v1}/shop/sanpham/` + id,
  UPDATE_PRODUCT: (id) => `${v1}/shop/sanpham/` + id + "/",
};

export default class ProductAPI {
  static getListProduct = (payload) =>
    appAxios.get(PRODUCT_ENDPOINT.GET_LIST_PRODUCT, payload);

  static getDetailProduct = (payload) =>
    appAxios.get(PRODUCT_ENDPOINT.GET_DETAIL_PRODUCT(payload), payload);

  static createProduct = (payload) =>
    appAxios.post(PRODUCT_ENDPOINT.CREATE_PRODUCT, payload);

  static updateProduct = (payload) =>
    appAxios.put(PRODUCT_ENDPOINT.UPDATE_PRODUCT(payload.id), payload);

  static deleteProduct = (payload) =>
    appAxios.delete(PRODUCT_ENDPOINT.DELETE_PRODUCT(payload), payload);
}
