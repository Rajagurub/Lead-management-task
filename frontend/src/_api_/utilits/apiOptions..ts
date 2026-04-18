type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface ApiOptionsParams {
  Tokens?: string;
  params?: Record<string, any>;
  url?: string;
  method?: HttpMethod;
  data?: any;
}

interface ApiRequestOptions {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export const apiOptions = async ({
  Tokens,
  params = {},
  url = "",
  method = "post",
  data,
}: ApiOptionsParams = {}): Promise<ApiRequestOptions> => {
  const options: ApiRequestOptions = {
    method: method.toLowerCase() as HttpMethod,
    url: `${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    params,
  };

  if (Tokens) {
    options.headers["authorization"] =`Bearer ${Tokens}`;
  }

  switch (options.method) {
    case "post":
    case "patch":
    case "put":
      return {
        ...options,
        data,
      };

    case "delete":
    case "get":
    default:
      return options;
  }
};