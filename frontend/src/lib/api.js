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

const getPostsApi = async (page = 1) => {
  const res = await fetch(`http://localhost:8000/posts?page=${page}&limit=10`);
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
      Authorization: `Bearer ${token}`,
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

const getMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8000/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("나의 정보 가져오기 실패");
  }
  return data;
};

export { getMe };

const updatePostApi = async (postId, title, content) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "수정 실패");
  }

  return data;
};

export { updatePostApi };
