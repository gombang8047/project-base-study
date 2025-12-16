"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { loginUserApi } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/main");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: (data) => loginUserApi(data.email, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/main");
    },
    onError: (error) => {
      alert("로그인 실패 : " + error.message);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 font-sans dark:text-black">
        <header className="flex justify-center">
          <div>
            <Image
              src="/jungle.webp"
              alt="Jungle Logo"
              width={250}
              height={40}
            />
          </div>
        </header>
        <div className="w-full max-w-6xl space-y-4 rounded-lg border border-gray-400 p-6 md:w-80 lg:w-90 xl:w-100 2xl:w-120">
          <div>
            <Input
              {...register("email")}
              type="text"
              className={`m-[1px] -mb-px h-12 rounded-b-none border-gray-400 ${errors.email ? "border-red-500" : "border-[#09aa5c]"}`}
              placeholder="아이디 또는 전화번호"
            />
            <Input
              {...register("password")}
              type="password"
              className={`m-[1px] h-12 rounded-t-none border-gray-400 ${errors.password ? "border-red-500" : "border-[#09aa5c]"}`}
              placeholder="비밀번호"
            />
          </div>
          <div className="grid gap-3">
            <Button
              type="submit"
              className="h-10 w-full border-gray-400 bg-gray-400 text-white hover:bg-gray-400/80"
            >
              로그인
            </Button>
            <GoogleButton></GoogleButton>
            <p className="text-center text-sm text-gray-600">
              회원가입을 하지 않았다면
            </p>
            <Button
              type="button"
              className="h-10 w-full"
              onClick={() => router.push("/auth/signup")}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
