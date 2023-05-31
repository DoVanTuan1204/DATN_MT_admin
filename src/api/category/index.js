import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";

export const CATEGORY_ENDPOINT = {
  GET_LIST_CATEGORY: `${v1}/shop/danhmuc/`,
  CREATE_CATEGORY: `${v1}/shop/danhmuc/`,
  DELETE_CATEGORY: (id) => `${v1}/shop/danhmuc/` + id,
  GET_DETAIL_CATEGORY: (id) => `${v1}/shop/danhmuc/` + id,
  UPDATE_CATEGORY: (id) => `${v1}/shop/danhmuc/` + id + "/",
};

export default class CategoryAPI {
  static getListCategory = (payload) =>
    appAxios.get(CATEGORY_ENDPOINT.GET_LIST_CATEGORY, payload);

  static getDetailCategory = (payload) =>
    appAxios.get(CATEGORY_ENDPOINT.GET_DETAIL_CATEGORY(payload), payload);

  static deleteCategory = (payload) =>
    appAxios.delete(CATEGORY_ENDPOINT.DELETE_CATEGORY(payload), payload);

  static createCategory = (payload) =>
    appAxios.post(CATEGORY_ENDPOINT.CREATE_CATEGORY, payload);

  static updateCategory = (payload) =>
    appAxios.put(CATEGORY_ENDPOINT.UPDATE_CATEGORY(payload.id), payload);
}
