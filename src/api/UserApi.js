export default async function UserApi(insidePage = 1, signal = undefined) {
  try {
    let url =
      "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=" +
      insidePage;
    let resp = await fetch(url, { signal });
    console.log("calling api",url);
    
    if (!resp.ok) {
      throw new Error("Failed to fetch");
    }
    return await resp.json();
  } catch (error) {
    throw error;
  }
}
