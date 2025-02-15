import { Functions } from "../utils/functions";
import { ApiEndpoint } from "./list";
import { APIAxiosPost } from "./services";

export const loginAPI = async (body: any) => {
  const obj = { endPoint: ApiEndpoint.login, body: body };
  const result: any = await APIAxiosPost(obj);
  if (result?.data) {
    await Functions._setRefreshToken(result?.data?.refreshToken);
    await Functions._setToken(result?.data?.accessToken);
  }
  return result;
};
