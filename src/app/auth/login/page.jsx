"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 font-sans dark:text-black">
      <header className="flex justify-center">
        <div>
          <Image src="/jungle.webp" alt="Jungle Logo" width={250} height={40} />
        </div>
      </header>
      <div className="w-full max-w-6xl space-y-4 rounded-lg border border-gray-400 p-6 md:w-80 lg:w-90 xl:w-100 2xl:w-120">
        <div>
          <Input
            className="m-[1px] -mb-px h-12 rounded-b-none border-gray-400"
            placeholder="아이디 또는 전화번호"
          />
          <Input
            className="m-[1px] h-12 rounded-t-none border-gray-400"
            placeholder="비밀번호"
          />
        </div>
        <div className="grid gap-3">
          <Button className="h-10 w-full border-gray-400 bg-gray-400 text-white hover:bg-gray-400/80">
            로그인
          </Button>
          <p className="text-center text-sm text-gray-600">
            회원가입을 하지 않았다면
          </p>
          <Button className="h-10 w-full">회원가입</Button>
        </div>
      </div>
    </div>
  );
}
