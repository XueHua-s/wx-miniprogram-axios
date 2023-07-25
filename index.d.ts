interface BeforeUse <T> {
  (config: T): void
}
interface AxiosConfig {
  method: "POST" | "GET" | "PUT" | "DELETE",
  header: Object,
  dataType: "json" | string,
  data: Object,
  params: Object,
  timeout: Number
}
interface Base extends AxiosConfig {
  baseUrl: string,
  method: undefined
}
interface Axios {
  // 参数
  (config: AxiosConfig): Promise<AxiosConfig>;
  // 拦截器
  interceptors: {
    requestBefore: BeforeUse<Base>,
    responseBefore: BeforeUse<any>
  }
}
declare const axios: Axios
export default axios
