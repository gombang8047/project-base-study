import MOCK_BLOG_DATA from "./mockData";

export const signupUserApi = async (email, password, username, role) => {
  const res = await fetch("http://localhost:8000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username, role }),
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error(data.message || "이미 존재하는 아이디 입니다.");
  }
  return data;
};

export { signupUserApi };

const loginUserApi = async (email, password) => {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};

export { loginUserApi };

const getPostsApi = async () => {
  const res = await fetch("http://localhost:8000/posts", {});
  return await res.json();
};

export { getPostsApi };

const getPostDetailApi = async (postId) => {
  const res = await fetch(`http://localhost:8000/posts/${postId}`, {});
  return await res.json();
};

export { getPostDetailApi };

const createPostApi = async (title, content) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ← JWT 토큰 헤더에 추가!
    },
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("게시물 등록 실패");
  }
  return data;
};
export { createPostApi };

const deletePostApi = async (postId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "삭제 실패");
  }

  return data;
};

export { deletePostApi };
