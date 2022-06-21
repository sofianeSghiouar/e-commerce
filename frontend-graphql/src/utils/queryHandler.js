import axios from 'axios';
import { toast } from 'react-toastify';
import getErrorMessage from './errorsHandler';

export default async function queryFetch({ query, variables = {}, method = 'post' }) {
  try {
    const result = await axios({
      url: 'http://localhost:8000/',
      method: method,
      headers: { 'content-type': 'application/json' },
      data: { query, variables },
    });
    return result;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
}
