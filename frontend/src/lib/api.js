import MOCK_BLOG_DATA from "./mockData";

export const signupUserApi = async (email, password, username) => {
  const res = await fetch("http://localhost:8000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });
  return res.json();
};

export { signupUserApi };

const loginUserApi = async (email, password) => {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export { loginUserApi };

const getPostsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_BLOG_DATA.user123.posts);
    }, 500);
  });
};

export { getPostsApi };

const getPostDetailApi = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = MOCK_BLOG_DATA.user123.posts.find(
        (p) => p.id === Number(postId)
      );
      resolve(post);
    }, 500);
  });
};

export { getPostDetailApi };
