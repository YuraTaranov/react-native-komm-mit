export type TGenerateOptions = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: any;
  multipart?: boolean;
};

export interface IFormatResponse {
  data: any;
  status: number;
  statusText: string;
}
