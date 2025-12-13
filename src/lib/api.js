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
