import appAxios from '../constant/axios-config'
import { v1 } from '../constant/version'

export const CATEGORY_ENDPOINT = {
  GET_LIST_CATEGORY: `${v1}/shop/danhmuc/`,
}

export default class CategoryAPI {
  static getListCategory = (payload) =>
    appAxios.get(CATEGORY_ENDPOINT.GET_LIST_CATEGORY, payload)
}
