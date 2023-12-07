import axios from 'axios';
import {TGenerateOptions, IFormatResponse} from '@types';
import {baseURL} from '@constants';
import storage from '../../store';

const instance = axios.create();
instance.defaults.baseURL = baseURL;
instance.defaults.timeout = 2000000;

export const httpPost = (url: string, data?: any) => sendRequest({method: 'POST', url, data});
export const httpGet = (url: string, params?: any) => sendRequest({method: 'GET', url, params});
export const httpDel = (url: string, data?: any) => sendRequest({method: 'DELETE', url, data});
export const httpPut = (url: string, data?: any) => sendRequest({method: 'PUT', url, data});
export const httpPatch = (url: string, data?: any) => sendRequest({method: 'PATCH', url, data});

const formatResponse: (response?: any) => IFormatResponse = (response = {}) => ({
  data: response.data || {},
  status: response.status || 418,
  statusText: response.statusText || '',
});

const sendRequest = async ({method, url, data = undefined, params = undefined}: TGenerateOptions) => {
  const OPTIONS = generateOptions({method, url, data, params});

  try {
    const response = await instance(OPTIONS);
    return formatResponse(response);
  } catch (error: any) {
    throw formatResponse(error.response);
  }
};

const generateOptions = ({method, url, data, params}: TGenerateOptions) => {
  const globalState: any = storage?.store?.getState().global || null;
  const locale = globalState?.lang === 'uk' ? 'ua' : globalState.lang;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'ru',
  };

  return {
    method,
    url,
    data,
    params,
    headers: {
      ...defaultHeaders,
      Locale: locale,
    },
  };
};
