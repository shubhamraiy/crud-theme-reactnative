import { navigationRef } from "../navigation";
import { Functions } from "../utils/functions";
import instance from "./instance";
import { ApiEndpoint } from "./list";

export const RefreshTokenAPI = async () => {
  const refreshToken = await Functions._getRefreshToken();
  return new Promise(async (resolve, reject) => {
    instance({
      method: "post",
      url: ApiEndpoint.refreshToken,
      headers: { refreshToken: `bearer ${refreshToken}` },
    })
      .then(async (res: any) => {
        if (res?.data?.status == "success") {
          await Functions._setRefreshToken(res?.data?.data?.refreshToken);
          await Functions._setToken(res?.data?.data?.token);
        }
        resolve(res);
      })
      .catch((err) => {
        handlingError(err?.response);
        reject(err?.response);
        if (err?.response?.status >= 500) {
          alert("Server Error");
        }
      });
  });
};

const handlingError = async (error: any) => {
  let status = error.status || "";
  let routeName = navigationRef.getCurrentRoute()?.name || "";
  if (routeName !== "Login") {
    if (status === 401) {
      await Functions.clearStorage();
    }
  }
};
