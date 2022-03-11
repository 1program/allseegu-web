export default interface ApiRequestOptions {
  method: "GET" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT";
  url: string;
  params?: any;
  data?: any;
}
