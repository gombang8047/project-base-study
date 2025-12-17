"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPostApi, updatePostApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bold,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Image as ImageIcon,
  Plus,
  Info,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function CreatePost() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const createOreditPost = useMutation({
    mutationFn: (data) => {
      if (editId) {
        return updatePostApi(editId, data.title, data.content);
      } else {
        return createPostApi(data.title, data.content);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      console.log("작성 성공");
      router.push("/main");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data: existingPost } = useQuery({
    queryKey: ["post", editId],
    queryFn: () => getPostDetailApi(editId),
    enabled: !!editId, // editId 있을 때만 실행
  });

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
    }
  }, [existingPost]);

  const onSubmit = (data) => {
    createOreditPost.mutate(data);
  };

  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-b-gray-300 p-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          <Button className="border-gary-400 rounded-sm border text-gray-400 hover:bg-gray-400/10">
            임시 저장
          </Button>
          <Button
            onClick={() => onSubmit({ title, content })}
            className="rounded-sm bg-[#09aa5c] text-white hover:bg-[#09aa5c]/80"
          >
            완료
          </Button>
        </div>
      </header>
      {/* 에디터 툴바 */}
      <div className="flex items-center gap-2 border-b border-b-gray-300 p-4">
        <Button variant="ghost" size="icon">
          <Bold className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <Underline className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <Strikethrough className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <List className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <ListOrdered className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <Code className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <ImageIcon className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
      {/* 제목 추가 버튼 */}
      {!showTitle && (
        <Button
          variant="ghost"
          className="w-full justify-start p-4 text-gray-500"
          onClick={() => setShowTitle(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          제목 추가
        </Button>
      )}
      {/* 제목 입력 */}
      {showTitle && (
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b border-b-gray-300 p-4 text-xl font-bold text-gray-400 outline-none"
        />
      )}
      {/* 본문 입력 */}
      <Textarea
        placeholder="나누고 싶은 생각을 작성주세요. 링크나 사진을 추가할 수도 있어요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] flex-1 resize-none border-0 p-4 focus-visible:ring-0"
      />
      {/* 안내 메시지 */}
      <div className="m-4 flex items-start gap-2 rounded bg-gray-50 p-4">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
        <div className="text-sm text-gray-600">
          <p className="font-medium">
            코드가 있는 게시물을 업데이트 수정 시 앱 버전 업데이트로 필요해요.
          </p>
          <p className="mt-1">
            업 버전 1.15.10 아래에서는 코드를 수정할 수 없어요.
          </p>
        </div>
      </div>
    </div>
  );
}
