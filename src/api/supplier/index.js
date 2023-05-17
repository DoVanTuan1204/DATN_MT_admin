import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";
export const SUPPLIER_ENDPOINT = {
  GET_LIST_SUPPLIER: `${v1}/shop/nha_cung_cap/`,
  CREATE_SUPPLIER: `${v1}/shop/nha_cung_cap/`,
  DELETE_SUPPLIER: (id) => `${v1}/shop/nha_cung_cap/` + id,
  UPDATE_SUPPLIER: (id) => `${v1}/shop/nha_cung_cap/` + id + "/",
};

export default class SupplierAPI {
  static getListSupplier = (payload) =>
    appAxios.get(SUPPLIER_ENDPOINT.GET_LIST_SUPPLIER, payload);

  static deleteSupplier = (payload) =>
    appAxios.delete(SUPPLIER_ENDPOINT.DELETE_SUPPLIER(payload), payload);

  static createSupplier = (payload) =>
    appAxios.post(SUPPLIER_ENDPOINT.CREATE_SUPPLIER, payload);

  static updateSupplier = (payload) =>
    appAxios.put(SUPPLIER_ENDPOINT.UPDATE_SUPPLIER(payload.id), payload);
}
