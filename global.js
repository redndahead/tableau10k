// Add the token to the header request.
function setHeader(xhr) {
  xhr.setRequestHeader('Auth', tableau.connectionData);
}
