// src/lib/mockData.js

// 가짜 블로그 정보 데이터
const MOCK_BLOG_DATA = {
  user123: {
    blogInfo: {
      ownerId: "user123",
      blogTitle: "Dev Winston's Blog",
      nickname: "Winston",
      description: "Next.js와 React를 공부하는 공간입니다.",
      profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 랜덤 아바타 생성 API
      headerImage:
        "https://images.unsplash.com/photo-1499750310159-5b5f007c6502", // 블로그 배경 이미지
    },
    posts: [
      {
        id: 1,
        title: "Next.js 15 App Router 완벽 가이드",
        summary:
          "서버 컴포넌트와 클라이언트 컴포넌트의 차이를 명확히 이해해봅시다.",
        category: "Development",
        createdAt: "2025-05-20",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        views: 120,
      },
      {
        id: 2,
        title: "티스토리 클론코딩 회고",
        summary: "프로젝트를 진행하며 겪었던 에러들과 해결 과정을 공유합니다.",
        category: "Retrospective",
        createdAt: "2025-05-18",
        thumbnail: null, // 썸네일 없는 경우 테스트
        views: 45,
      },
      {
        id: 3,
        title: "오늘 점심 뭐 먹지?",
        summary: "제육볶음 vs 돈까스 최대의 난제",
        category: "Daily",
        createdAt: "2025-05-15",
        thumbnail:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        views: 12,
      },
    ],
  },
};
