"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { signupSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signupUserApi } from "@/lib/api";
import { User, Lock, Mail, Phone, Calendar, PhoneIcon } from "lucide-react";
import SignInput from "@/components/auth/SignInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const signupMutation = useMutation({
    mutationFn: (data) =>
      signupUserApi(data.email, data.password, data.username),

    onSuccess: (data) => {
      alert("회원가입 성공");
      router.push("/auth/login");
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="item-center flex justify-center p-4 pt-20">
          <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
            <SignInput
              icon={User}
              register={register}
              name="email"
              type="text"
              placeholder="아이디"
              error={errors.email}
              className="-mb-px rounded-b-none"
            ></SignInput>
            <SignInput
              icon={Lock}
              register={register}
              name="password"
              type="password"
              placeholder="비밀번호"
              error={errors.password}
              className="-mb-px rounded-none"
            ></SignInput>
            <SignInput
              icon={Lock}
              register={register}
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              error={errors.confirmPassword}
              className="-mb-px rounded-none"
            ></SignInput>
            <SignInput
              icon={Mail}
              register={register}
              name="confirmEmail"
              type="text"
              placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
              error={errors.confirmEmail}
              className="rounded-t-none"
            ></SignInput>
            <div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              {errors.confirmEmail && (
                <p className="text-sm text-red-500">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
            <SignInput
              icon={User}
              register={register}
              name="username"
              type="text"
              placeholder="이름"
              error={errors.username}
              className="-mb-px rounded-b-none"
            ></SignInput>
            <SignInput
              icon={Calendar}
              register={register}
              name="calendar"
              type="text"
              placeholder="생년월일 8자리"
              error={errors.calendar}
              className="-mb-px rounded-none"
            ></SignInput>
            <div className="item-center m-[1px] flex w-full justify-center gap-2 rounded rounded-t-none border border-gray-300 p-1">
              <div>
                <ToggleGroup
                  type="single"
                  value={gender}
                  onValueChange={setGender}
                  className="h-7 w-40 rounded-sm"
                >
                  <ToggleGroupItem value="male" className="w-20">
                    남자
                  </ToggleGroupItem>
                  <ToggleGroupItem value="female" className="w-20">
                    여자
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <ToggleGroup
                  type="single"
                  value={nationality}
                  onValueChange={setNationality}
                  className="h-7 w-40 rounded-sm"
                >
                  <ToggleGroupItem value="domestic" className="w-20">
                    내국인
                  </ToggleGroupItem>
                  <ToggleGroupItem value="foreign" className="w-20">
                    외국인
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              {errors.calendar && (
                <p className="text-sm text-red-500">
                  {errors.calendar.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="item-center flex justify-center p-4">
          <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
            <SignInput
              icon={PhoneIcon}
              register={register}
              name="phone"
              type="text"
              placeholder="휴대전화번호"
              error={errors.phone}
            ></SignInput>
            <div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="item-center flex justify-center p-4">
          <div className="w-full max-w-6xl md:w-80 lg:w-90 xl:w-100 2xl:w-120">
            <Button className="w-full bg-[#09aa5c] text-white hover:bg-[#09aa5c]/85">
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
