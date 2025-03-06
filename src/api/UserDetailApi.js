const UserDetailApi = async (postId) => {
  try {
    let resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    let res = await resp.json();

    return res;
  } catch (error) {
    throw error;
  }
};

export default UserDetailApi;
