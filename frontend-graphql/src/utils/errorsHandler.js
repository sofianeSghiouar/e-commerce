export default function getErrorMessage(error) {
  return error.response && error.response.data
    ? error.response.data
    : error[0].message
    ? error[0].message
    : error.message;
}
