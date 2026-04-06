import { apiClient } from "../lib/apiClient";
import { authClient } from "../lib/authClients";
import { AxiosResponse } from "axios";
import { MetaTestDataInterface } from "../types/Test";
export interface DataProps<T> {
  data: T;
  error:string|undefined;
  message:string|undefined
  meta: {
    page: number;
    total: number;
  };
}
export default async function queryFn<T>(
  link: string,
  forAuthUser?: boolean,
  method: "GET" | "POST" | "DELETE" | "PATCH"='GET',
  addHeader?:Record<string,string>
): Promise<DataProps<T>> {
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
    console.log('QueryFn:',res.data.data)
    return res.data as DataProps<T>;
  } catch (err) {
    throw new Error("Fetch Error try again later");
  }
}
