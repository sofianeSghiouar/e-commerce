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
    console.log('result pre:>> ', result);
    if (result.data.hasOwnProperty('errors')) {
      console.log('result errors:>> ', result.data.errors);
      return toast.error(getErrorMessage(result.data.errors));
    }
    return result;
  } catch (error) {
    console.log('error queryHandler:>> ', error);
    toast.error(getErrorMessage(error));
  }
}
