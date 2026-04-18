import { apiOptions } from "./utilits/apiOptions.";
import { apiRequest } from "./utilits/apiRequest";
import { type AxiosResponse } from "axios";
import {url} from "../constents";

const leads = `${url.baseURL}/api/leads`;

type Token = string;

interface LeadBodyParams {
  [key: string]: any;
}

export const leadApiServices = {
  

  getAllLeads: async (token: Token):Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: `${leads}/get`,
      method: "get",
      Tokens:token,
    });

    return apiRequest(options);
  },


  createLead: async (
    token: Token,
    body: LeadBodyParams
  ): Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: `${leads}/create`,
      method: "post",
       Tokens:token,
      data: body,
    });

    return apiRequest(options);
  },


  updateLead: async (
    token: Token,
    id: string,
    body: LeadBodyParams
  ): Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: `${leads}/update/${id}`,
      method: "put",
         Tokens:token,
      data: body,
    });

    return apiRequest(options);
  },


  deleteLead: async (
    token: Token,
    id: string
  ): Promise<AxiosResponse | any> => {
    const options = await apiOptions({
      url: `${leads}/delete/${id}`,
      method: "delete",
        Tokens:token,
    });

    return apiRequest(options);
  },
};