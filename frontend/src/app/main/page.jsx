"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileCodeCorner,
  BookOpen,
  Briefcase,
  Wrench,
  Search,
  Bell,
  User,
  Loader2,
  MoreVertical,
  Flame,
} from "lucide-react";
import CategoryItem from "@/components/main/Category";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostContainer from "@/components/main/PostContaioner";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMe, getPostsApi } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 토큰 저장
      localStorage.setItem("token", token);

      // URL에서 토큰 제거 (깔끔하게)
      router.replace("/main");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => getPostsApi(pageParam),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
    });
  // 데이터 구조 변경!
  const posts = data?.pages.flat() || [];

  const loadMoreRef = useRef(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("📄 다음 페이지 로딩 시작!", {
          현재페이지: data?.pages.length,
          총게시물: posts.length,
          hasNextPage,
        });
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  return (
    <div className="flex flex-col">
      {/* 페이지 전체 박스 */}

      <header className="sticky top-0 z-10 flex flex-row items-center justify-between border-b border-b-gray-400 bg-white pr-4 pl-4">
        {/* 헤더와 검색 작성하기 박스 */}
        <Link href="/main">
          <Image
            className="p-3"
            src="/jungle.webp"
            alt="Jungle Logo"
            width={120}
            height={10}
          />
        </Link>

        <div className="flex flex-row items-center justify-center">
          <Button className="border border-0 text-gray-700">
            <Search></Search>
          </Button>
          <Button className="border border-0 text-gray-700">
            <Bell></Bell>
          </Button>
          <div className="flex items-center justify-center pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="items-center justify-center focus:outline-none focus-visible:ring-0"
                  variant="ghost"
                  size="icon"
                >
                  <Avatar>
                    <AvatarImage src={user?.picture || "/default-avatar.png"} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="items-center justify-center bg-white p-0 shadow-none">
                <DropdownMenuItem>
                  <Button
                    onClick={handleLogout}
                    className="items-center justify-center border border-0 font-bold text-red-500 hover:bg-white"
                  >
                    <Flame></Flame>로그아웃
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={() => router.push("/post/create")}
            className="rounded-3xl border border-gray-700 bg-gray-700 text-white hover:bg-gray-700/80"
          >
            작성하기
          </Button>
        </div>
      </header>

      <div className="flex gap-10 p-13">
        {/* 왼쪽 오른쪽 감싸는 박스 */}

        <div className="sticky top-26 h-fit">
          {/* 왼쪽 박스 */}
          <div className="w-55 pb-20">
            {/* 왼쪽 상단 */}
            <p className="pb-3 text-2xl font-bold">나의 TIL 게시판</p>
            <p className="text-gray-500">
              오늘의 경험과 인사이트, 해결한 문제를 기록해보세요.
            </p>
          </div>
          <div>
            {/* 카테고리 */}

            <Tabs defaultValue="dev">
              <TabsList className="flex flex-col items-start">
                <CategoryItem
                  icon={FileCodeCorner}
                  name="개발일기"
                  value="dev"
                  iconColor="green"
                ></CategoryItem>
                <CategoryItem
                  icon={BookOpen}
                  name="노트"
                  value="note"
                  iconColor="blue"
                ></CategoryItem>
                <CategoryItem
                  icon={Briefcase}
                  name="업무"
                  value="work"
                  iconColor="yellow"
                ></CategoryItem>
                <CategoryItem
                  icon={Wrench}
                  name="트러블 슈팅"
                  value="trouble"
                  iconColor="purple"
                ></CategoryItem>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="w-full">
          {/* 오른쪽 박스 */}
          {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-[#09aa5c]" />
            </div>
          ) : (
            posts?.map((post, index) => (
              <Link key={post.id} href={`post/${post.id}`}>
                <PostContainer
                  count={index + 1} // ← key 제거!
                  title={post?.title}
                  summary={post?.content}
                  nickname={post?.author?.username}
                  authorRole={post?.author?.role}
                  profileImage={post?.author?.picture}
                  likes={post?.likeCount}
                  views={post?.viewCount}
                />
                {index < posts.length - 1 && <Separator />}
              </Link>
            ))
          )}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="flex items-center justify-center p-10"
            >
              <Loader2 className="h-8 w-8 animate-spin text-[#09aa5c]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
