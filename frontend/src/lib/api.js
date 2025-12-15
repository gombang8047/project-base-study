import MOCK_BLOG_DATA from "./mockData";

// [임시] 회원가입 API 함수 (실제로는 lib/api.js 등으로 분리 권장)
const signupUserApi = async (data) => {
  // 서버 요청 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("서버로 전송된 데이터:", data);
      resolve({ message: "Success" });
    }, 1000);
  });
};

export { signupUserApi };

const loginUserApi = async (data) => {
  // 서버 요청 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("서버로 전송된 데이터:", data);
      resolve({ message: "Success" });
    }, 1000);
  });
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
