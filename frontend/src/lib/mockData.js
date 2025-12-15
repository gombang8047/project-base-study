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
          "서버 컴포넌트와 클라이언트 컴포넌트의 차이를 명확히 이해해봅시다. 가나다라마바사아자차카타파하",
        category: "Development",
        createdAt: "2025-05-20",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
        views: 120,
      },
      {
        id: 2,
        title: "티스토리 클론코딩 회고",
        summary: "프로젝트를 진행하며 겪었던 에러들과 해결 과정을 공유합니다.",
        category: "Retrospective",
        createdAt: "2025-05-18",
        thumbnail: null, // 썸네일 없는 경우 테스트
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
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
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
        views: 12,
      },
      {
        id: 4,
        title: "나 오늘 집에 안갈래",
        summary: "현재 시각 12시",
        category: "Daily",
        createdAt: "2025-05-15",
        thumbnail:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
        views: 12,
      },
      {
        id: 5,
        title: "집 가고 싶다",
        summary: "미쳐 - 포미닛 많관부",
        category: "Daily",
        createdAt: "2025-05-15",
        thumbnail:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
        views: 12,
      },
      {
        id: 6,
        title: "보름달이 뜨는 날 날 보러 와요",
        summary: "선미",
        category: "Daily",
        createdAt: "2025-05-15",
        thumbnail:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        nickname: "Winston", // 추가
        profileImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Winston", // 추가
        authorRole: "Frontend Developer", // 추가
        likes: 14,
        views: 12,
      },
    ],
  },
};

export default MOCK_BLOG_DATA;
