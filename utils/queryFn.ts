import { apiClient } from "../lib/apiClient";
import { authClient } from "../lib/authClients";
import { AxiosResponse } from "axios";
export default async function queryFn<T>(
  link: string,
  forAuthUser?: boolean,
  method: "GET" | "POST" | "DELETE" | "PATCH"='GET',
  addHeader?:Record<string,string>
): Promise<T> {
  try {
    const cookies = authClient.getCookie();
    const res = await apiClient(
      `${process.env.EXPO_PUBLIC_NGROK ?? "localhost:3000"}${link}`,
      {
        method,
        headers:{
          ...(forAuthUser && cookies ? { Cookie: cookies } : {}),
          ...addHeader,
        }
      },
    );
    return res.data as T;
  } catch (err) {
    throw new Error("Fetch Error try again later");
  }
}
