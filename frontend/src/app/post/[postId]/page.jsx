"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  User,
  MoreVertical,
  Flame,
  Loader2,
  CornerDownRight,
  LogOut,
  FileEdit,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deletePostApi, getMe, getPostDetailApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Post() {
  const router = useRouter();

  const params = useParams();

  const { postId } = params;

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostDetailApi(postId),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: (postId) => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      alert("삭제 성공");
      router.push("/main");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-[#09aa5c]" />
      </div>
    );

  return (
    <div className="flex flex-col">
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
                    <LogOut></LogOut>로그아웃
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
      <Card className="flex w-full flex-col items-center justify-center gap-8 border-0">
        {/* 게시물 */}
        <div className="flex w-full flex-col items-start p-10">
          <CardHeader className="mb-7 flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={post?.author?.picture} />
              </Avatar>
              <div className="flex flex-col">
                {/* 이름과 직업 */}
                <div className="text-sm font-bold">
                  {post?.author?.username}
                </div>
                <div className="text-xs text-gray-400">
                  {post?.author?.role}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <Button className="h-7 w-12 rounded-sm border border-gray-700 bg-gray-700 text-xs text-white hover:bg-gray-700/80">
                팔로우
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="focus:outline-none focus-visible:ring-0"
                    variant="ghost"
                    size="icon"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-fit pr-4">
                  <DropdownMenuItem
                    onClick={() => router.push(`/post/create?edit=${postId}`)}
                    className="cursor-pointer font-bold text-[#09aa5c]"
                  >
                    <FileEdit></FileEdit>수정
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deletePost.mutate(postId)}
                    className="cursor-pointer font-bold text-red-500"
                  >
                    <Flame></Flame>삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="w-full">
            <div className="w-full">
              {/* 제목과 내용과 사진과 좋아요 */}
              <div className="flex flex-col items-start">
                {/* 제목과 내용 */}
                <div className="text-lg">
                  <div className="mb-8 font-bold">{post?.title}</div>
                  <div className="text-sm whitespace-pre-wrap">
                    {post?.content}
                  </div>
                </div>
              </div>
              <div className="mt-3 mb-3 text-sm text-gray-400">
                {new Date(post?.createdAt).toLocaleString("ko-KR")}
              </div>
              <Separator />
              <div className="mt-2 flex gap-2 text-xs text-gray-400">
                {/* 좋아요 */}
                <span>좋아요 {post?.likeCount}</span>
                <span>조회 {post?.viewCount}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      <div className="p-10">
        {/* 댓글박스 */}
        <div className="pb-3 text-2xl font-bold">댓글</div>
        <div className="flex flex-row items-center justify-center border border-gray-400 p-2">
          <Avatar>
            <AvatarImage src={"/default-avatar.png"} />
          </Avatar>
          <Textarea
            placeholder="댓글을 남겨보세요."
            className="flex-1 rounded-none border-0"
          ></Textarea>
          <Button className="rounded-sm border border-red-400 bg-red-400 text-white hover:bg-red-400/80">
            등록
          </Button>
        </div>
        <div className="flex flex-col gap-4 border-t border-gray-200 p-2 pt-4">
          <div className="flex flex-row gap-2">
            {/* 프로필과 이름 직업 */}
            <Avatar className="h-8 w-8 flex-none">
              <AvatarImage src="/default-avatar.png" />
            </Avatar>
            {/* 헤더 */}
            <div className="mb-2 flex justify-between">
              <div>
                <p className="text-xs font-bold">이도형</p>
                <p className="text-xs text-gray-600">
                  숭실대학교 컴퓨터학부 • 12월 1일
                </p>
              </div>
            </div>
          </div>

          {/* 댓글 내용 */}
          <div className="flex-1">
            {/* 댓글 텍스트 */}
            <div>
              <p className="rounded bg-gray-50 px-3 py-2 text-sm">
                가나다라마바사 댓글 조작 왜들 그리 다운돼있어? 뭐가 문제야 say
                something 분위기가 겁나 싸해 요새는 이런 게 유행인가 왜들 그리
                재미없어? 아 그건 나도 마찬가지 Tell me what I got to do 급한
                대로 블루투스 켜
              </p>
            </div>

            {/* 답글 버튼 */}
            <Button variant="ghost" className="text-gray-400">
              <CornerDownRight className="mr-2 h-4 w-4" />
              <span className="text-xs">답글 남기기</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
