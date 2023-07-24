interface BeforeUse <T> {
  (config: T): T
}
interface AxiosConfig {
  method: "POST" | "GET" | "PUT" | "DELETE",
  header: Object,
  dataType: "json" | string,
  data: Object,
  timeout: Number,
}
interface Base {
  baseUrl: string,
  header: Object
}
export class Axios {
  constructor(config: AxiosConfig);
  interceptors: {
    requestBefore: BeforeUse<Base>,
    responseBefore: BeforeUse<any>
  }
}
declare const axios: Axios
export default axios
