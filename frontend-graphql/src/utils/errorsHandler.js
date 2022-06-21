export default function getErrorMessage(error) {
  return error.response && error.response.data
    ? error.response.data
    : error.message;
}
