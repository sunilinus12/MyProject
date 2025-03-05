export default async function UserApi(insidePage = 1) {
  try {
    let resp = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=" + insidePage
    );
    if (!resp.ok) {
      throw new Error("Failed to fetch");
    }
    return await resp.json();
  } catch (error) {
    throw error;
  }
}
