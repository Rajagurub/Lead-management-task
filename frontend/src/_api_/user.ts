import { apiOptions } from "./utilits/apiOptions.";
import { apiRequest } from "./utilits/apiRequest";
import { type AxiosResponse } from "axios";
import {url} from "../constents";

const users = `${url.baseURL}/api/users`;
type Tokens = string;

interface userBodyParams {
   [key: string]: any;
 }

export const userApiServices = {
  getAllusers: async (token:Tokens): Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: `${users}/all`,
      method: "get",
      Tokens:token
    });

    return apiRequest(options);
  },
   createAuser: async (token:Tokens,body:userBodyParams): Promise<AxiosResponse | any> => {
    console.log(token,"usersToeks")
    const options = await apiOptions({
      url:`${users}/create`,
      method: "post",
      Tokens:token,
      data:body
    });
    

    return apiRequest(options);
  },

  editAuser: async (token:Tokens,body:userBodyParams,id:string): Promise<AxiosResponse | any> => {
    console.log(token,"usersToeks")
    const options = await apiOptions({
      url:`${users}/update/${id}`,
      method: "put",
      Tokens:token,
      data:body
    });
    

    return apiRequest(options);
  },
   DeleteAuser: async (token:Tokens,id:string): Promise<AxiosResponse | any> => {
    console.log(token,"usersToeks")
    const options = await apiOptions({
      url:`${users}/delete/${id}`,
      method: "delete",
      Tokens:token,
    });
    

    return apiRequest(options);
  },

}