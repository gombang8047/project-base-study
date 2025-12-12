"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export default function Home() {

  const handleClick = () => {
    console.log("버튼이 클릭되었습니다.");
  };

  return (
    <div className="grid justify-center min-h-screen items-center bg-zinc-50 font-sans dark:bg-black dark:text-white">
      <p>좋은데요</p>
      <Input placeholder = "이름 입력" />
      <Button variant="destructive" onClick = {handleClick}>제출</Button>

    </div>
  );
}
