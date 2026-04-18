import { apiOptions } from "./utilits/apiOptions.";
import { apiRequest } from "./utilits/apiRequest";
import { type AxiosResponse } from "axios";
import {url} from "../constents";

const dashboardReport = `${url.baseURL}/api/dashboard/get`;

type Token = string;


export const dashBoardApiServices = {
    getAllDashboard:async (token: Token):Promise<AxiosResponse | any> => {
        const options = await apiOptions({
          url: `${dashboardReport}`,
          method: "get",
          Tokens:token,
        });
    
        return apiRequest(options);
      },
}