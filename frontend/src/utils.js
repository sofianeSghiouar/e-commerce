export default function getErrorMessage(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}
