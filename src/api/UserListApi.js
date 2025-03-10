export default async function UserListApi(page = 1) {
  try {
    let resp = await fetch(
      "https://testapi.getlokalapp.com/common/jobs?page=" + page
    );
    if (!resp.ok) {
      return new Error("Fetched Failed");
    }
    let res = await resp.json();
    return res;
  } catch (error) {
    throw error;
  }
}
