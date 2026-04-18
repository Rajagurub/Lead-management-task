import { apiOptions } from "./utilits/apiOptions.";
import { apiRequest } from "./utilits/apiRequest";
import { type AxiosResponse } from "axios";
import {url} from "../constents";

const ADMIN_LOGIN = `${url.baseURL}/api/auth/login`;
type Tokens = string;

interface AdminParams {
  [key: string]: any;
}

export const Admin_login_Service = {
  LoginAdmin: async (params: AdminParams): Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: ADMIN_LOGIN,
      data: params,
      method: "post",
    });

    return apiRequest(options);
  },
}