var base10KURL = 'https://api.10000ft.com';
// Add the token to the header request.
function setHeader(xhr) {
  xhr.setRequestHeader('Auth', tableau.connectionData);
}
