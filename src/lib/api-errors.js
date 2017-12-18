// because Fetch doesn't recognize error responses as
// actual errors since it's technically completing the response...
export function handleApiErrors (response) {
  if (!response.ok) console.log(response)
  return response
}
