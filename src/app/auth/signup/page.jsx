"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex-col p-4">
      <header>
        <div>
          <Image
            className="p-4"
            src="/jungle.webp"
            alt="Jungle Logo"
            width={150}
            height={40}
          />
        </div>
      </header>
      <div className="item-center flex justify-center p-4">
        <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
          <Input
            placeholder="아이디"
            className="m-[1px] -mb-px rounded-b-none"
          ></Input>
          <Input
            placeholder="비밀번호"
            className="m-[1px] -mb-px rounded-none"
          ></Input>
          <Input
            placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
            className="m-[1px] rounded-t-none"
          ></Input>
        </div>
      </div>
      <div className="item-center flex justify-center p-4">
        <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
          <Input
            placeholder="이름"
            className="m-[1px] -mb-px rounded-b-none"
          ></Input>
          <Input
            placeholder="생년월일 8자리"
            className="m-[1px] -mb-px rounded-none"
          ></Input>
          <Input
            placeholder="통신사 선택"
            className="m-[1px] -mb-px rounded-none"
          ></Input>
          <div className="item-center m-[1px] flex w-full justify-center gap-2 rounded rounded-t-none border border-gray-300 p-1">
            <div>
              <Button className="-mr-px h-7 w-20 rounded-sm rounded-r-none">
                남자
              </Button>
              <Button className="-mr-px h-7 w-20 rounded-sm rounded-l-none">
                여자
              </Button>
            </div>
            <div>
              <Button className="-mr-px h-7 w-20 rounded-sm rounded-r-none">
                내국인
              </Button>
              <Button className="-mr-px h-7 w-20 rounded-sm rounded-l-none">
                외국인
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="item-center flex justify-center p-4">
        <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
          <Input placeholder="휴대전화번호"></Input>
        </div>
      </div>
      <div className="item-center flex justify-center p-4">
        <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
          <Button className="w-full bg-[#09aa5c] text-white hover:bg-[#09aa5c]/85">
            인증요청
          </Button>
        </div>
      </div>
    </div>
  );
}
