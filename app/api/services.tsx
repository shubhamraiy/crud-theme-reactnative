import { Functions } from "../utils/functions";
import instance from "./instance";

export const APIAxios = async (endPoint: any, headers?: any) => {
  const token = await Functions._getToken();
  let obj = {
    method: "get",
    url: endPoint,
    headers: {
      ...headers,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise(async (resolve, reject) => {
    instance(obj)
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err?.response);
        if (err?.response?.status >= 500) {
          alert("Server Error");
        }
      });
  });
};

export const APIAxiosPost = async (data: any) => {
  const token = data.token || (await Functions._getToken());

  let obj = {
    method: "post",
    url: data.endPoint,
    data: data.body,
    headers: {
      ...data.headers,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise(async (resolve, reject) => {
    instance(obj)
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err?.response);
        if (err?.response?.status >= 500) {
          alert("Server Error");
        }
      });
  });
};
