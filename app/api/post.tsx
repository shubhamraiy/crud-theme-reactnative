import { RefreshTokenAPI } from "./accessToken";
import { ApiEndpoint } from "./list";
import { APIAxios, APIAxiosPost } from "./services";

export const postAPI = async (params: any) => {
  const fetch = ApiEndpoint.getPost + params;
  try {
    const result = await APIAxios(fetch);
    return result;
  } catch (error: any) {
    if (error?.data) {
      const data: any = await RefreshTokenAPI();
      if (data?.data) {
        return await APIAxios(fetch);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export const addPostAPI = async (body: any) => {
  const obj = { endPoint: ApiEndpoint.addPost, body: body };

  try {
    const result: any = await APIAxiosPost(obj);
    return result;
  } catch (error: any) {
    if (error?.data) {
      const data: any = await RefreshTokenAPI();
      if (data?.data) {
        return await APIAxiosPost(obj);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export const updatePostAPI = async (postId: number, updatedData: any) => {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    return error;
  }
};
