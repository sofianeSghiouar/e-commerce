import axios from 'axios';
import { toast } from 'react-toastify';
import getErrorMessage from './errorsHandler';

export default async function queryFetch({
  query,
  variables = {},
  method = 'post',
}) {
  try {
    const result = await axios({
      url: 'http://localhost:8000/',
      method: method,
      headers: { 'content-type': 'application/json' },
      data: { query, variables },
    });
    console.log('result queryH:>> ', result);
    if (result.data.hasOwnProperty('errors')) {
      throw new Error(result.data.errors.message);
    }
    return result;
  } catch (error) {
    console.log('error queryH :>> ', { ...error });
    toast.error(getErrorMessage(error));
  }
}
