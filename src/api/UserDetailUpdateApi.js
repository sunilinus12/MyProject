export default async function UserDetailUpdateApi(updatedData) {
    try {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // ✅ Proper header format
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      if (!resp.ok) {
        throw new Error("Failed to update post");
      }
  
      // ✅ Handle cases where API might return an empty response
      return resp.status === 204 ? null : await resp.json();
    } catch (error) {
      throw error; // ✅ Re-throwing for proper error handling in ViewModel
    }
  }
  