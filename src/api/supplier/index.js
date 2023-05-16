import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";
export const SUPPLIER_ENDPOINT = {
  GET_LIST_SUPPLIER: `${v1}/shop/nha_cung_cap/`,
};

export default class SupplierAPI {
  static getListSupplier = (payload) =>
    appAxios.get(SUPPLIER_ENDPOINT.GET_LIST_SUPPLIER, payload);
}
