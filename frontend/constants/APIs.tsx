import { SecureStore } from "@/imports/Storage";
import * as FileSystem from "expo-file-system";

export const server = "https://arcfit.xyz";

type APISpec<T = {}> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  needsAuth: boolean;
  contentType: "application/json" | "multipart/form-data",
};
export namespace API {
  export const api = `${server}/api`;
  export namespace Account {
    export const login: APISpec<{ username: string; password: string }> = {
      url: `${api}/accounts/login`,
      method: "POST",
      contentType: "application/json",
      needsAuth: false,
    };

    export const register: APISpec<{
      username: string,
      password: string,
      first_name?: string,
      last_name?: string,
      email?: string,
      age?: number,
      gender?: 0 | 1 | 2,
      phone_number?: string,
    }> = {
      url: `${api}/accounts/register`,
      method: "POST",
      contentType: "application/json",
      needsAuth: false,
    };

    export const logout: APISpec = {
      url: `${api}/accounts/logout`,
      method: "POST",
      contentType: "application/json",
      needsAuth: true,
    };


    export const update: APISpec<{
      username?: string,
      password?: string,
      first_name?: string,
      last_name?: string,
      email?: string,
      age?: number,
      gender?: 0 | 1 | 2,
      phone_number?: string,
    }> = {
      url: `${api}/accounts/update`,
      method: "POST",
      contentType: "application/json",
      needsAuth: true,
    };

    export const uploadAvatar: APISpec<string> = {
      url: `${api}/accounts/upload_avatar`,
      method: "POST",
      contentType: "multipart/form-data",
      needsAuth: true,
    };
    // export const refreshToken = `${api}/accounts/refresh-token`;
  }

  type deduceArgs<T extends APISpec> = T extends APISpec<infer U> ? U : never;

  export async function call<T extends APISpec>(api: T, args: deduceArgs<T>) {
    const headers = {
      ...api.headers,
    };

    if (api.needsAuth) {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      } else {
        throw new Error("Not logged in");
      }
    }

    console.log(`Calling ${api.url}: method=${api.method}, headers=${JSON.stringify(headers)}, args=${JSON.stringify(args)}`);

    const data = typeof args !== "string" ? JSON.stringify(args) : args;
    if (api.contentType === "application/json") {
      headers["Content-Type"] = "application/json";
      const response = await fetch(api.url, {
        method: api.method,
        headers,
        body: data,
      });
      const json = await response.json();
      console.log(`Got response: ${JSON.stringify(json)}`);
      if (response.ok) {
        return json;
      } else {
        throw new Error(json);
      }
    } else if (api.contentType === "multipart/form-data") {
      if (api.method !== "POST" && api.method !== "PUT") {
        throw new Error(`${api.method} method not supported for multipart/form-data`);
      }
      console.log(`Uploading ${data} to ${api.url}, headers=${JSON.stringify(headers)}`);
      const response = await FileSystem.uploadAsync(api.url, data, {
        fieldName: "image",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        httpMethod: api.method,
        headers,
      });
      console.log(`Got response: ${response.body}`);
      return JSON.parse(response.body);
    }

    throw new Error(`Unsupported content type ${api.contentType}`);
  }
}