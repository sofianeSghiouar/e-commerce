export default function getErrorMessage(error) {
  return error.data && error.data.errors
    ? error.data.errors[0].message
    : error.message;
}
