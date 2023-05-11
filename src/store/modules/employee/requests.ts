import axios from '../../../services/axios';
import * as types from './types';

export async function sendPost(
  url: string,
  data: types.EmployeeSaveRequestPayload,
): Promise<string> {
  let result = '';
  const response = await axios.post(url, data);
  result = response.data;

  return result;
}

export async function sendPut(
  url: string,
  data: types.EmployeeSaveRequestPayload,
): Promise<string> {
  let result = '';
  const response = await axios.put(url, data);
  result = response.data;

  return result;
}

export async function sendDelete(url: string): Promise<string> {
  let result = '';
  const response = await axios.delete(url);
  result = response.data;

  return result;
}
