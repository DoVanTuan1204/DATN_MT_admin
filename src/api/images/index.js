import appAxios from "../constant/axios-config";
import { v1 } from "../constant/version";
export const IMAGES_ENDPOINT = {
  CREATE_IMAGES: `${v1}/shop/hinh_anh/`,
};

export default class ImagesAPI {
  static createImages = (payload) =>
    appAxios.post(IMAGES_ENDPOINT.CREATE_IMAGES, payload);
}
