import { RefreshTokenAPI } from "./accessToken";
import { ApiEndpoint } from "./list";
import { APIAxios } from "./services";

export const getProfileAPI = async () => {
  try {
    const result: any = await APIAxios(ApiEndpoint.profile, {
      credentials: "include",
    });
    return result;
  } catch (error: any) {
    if (error?.data?.status == "error" && error?.data?.message == "UNAUTH") {
      const data: any = await RefreshTokenAPI();
      if (data?.data?.status == "success") {
        const res: any = await APIAxios(ApiEndpoint.profile);
        return res;
      } else {
        return error || null;
      }
    } else {
      return error || null;
    }
  }
};
