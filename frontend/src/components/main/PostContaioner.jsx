import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const PostContainer = (props) => {
  const {
    id,
    title,
    summary,
    nickname,
    authorRole,
    profileImage,
    likes,
    views,
  } = props;

  return (
    <Card className="w-full border-0 pt-3">
      <div className="flex w-full flex-row">
        <span className="pb-2 text-2xl font-bold">{id}</span>
        <div className="w-full">
          <CardHeader>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={`${profileImage}`} />
              </Avatar>
              <div className="flex flex-col">
                {/* 이름과 직업 */}
                <div className="text-sm font-bold">{nickname}</div>
                <div className="text-xs text-gray-400">{authorRole}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              {/* 제목과 내용과 사진과 좋아요 */}
              <div className="flex flex-row items-center">
                {/* 제목과 내용 */}
                <p className="line-clamp-2 text-sm">
                  <span className="font-bold">{title}</span>
                  <span className="pr-2 pl-2 text-gray-300">|</span>
                  <span>{summary}</span>
                </p>
              </div>
              <div className="mt-2 flex gap-2 text-xs text-gray-400">
                {/* 좋아요 */}
                <span>좋아요 {likes}</span>
                <span>조회 {views}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default PostContainer;
