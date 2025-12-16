// src/lib/schemas.js
import z from "zod";

// 회원가입 스키마
export const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "❌닉네임은 2글자 이상이어야 합니다." })
      .max(10, { message: "❌닉네임은 10글자 이하여야 합니다." }),
    email: z
      .string()
      .min(6, { message: "❌아이디는 최소 6글자 이상이여야 합니다." })
      .regex(/[a-zA-Z]/, { message: "❌영문자를 포함해야 합니다." })
      .regex(/[0-9]/, { message: "❌숫자를 포함해야 합니다." }),
    password: z
      .string()
      .min(6, { message: "❌비밀번호는 최소 6자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "❌영문자를 포함해야 합니다." })
      .regex(/[0-9]/, { message: "❌숫자를 포함해야 합니다." }),
    confirmPassword: z.string(),
    confirmEmail: z
      .string()
      .email({ message: "❌올바른 이메일 형식을 입력해주세요." }),
    calendar: z
      .string()
      .min(8, { message: "❌8자리가 아닙니다." })
      .max(8, { message: "❌8자리가 아닙니다." }),
    phone: z
      .string()
      .min(11, { message: "❌11자리 숫자가 아닙니다." })
      .max(11, { message: "❌11자리 숫자가 아닙니다." })
      .regex(/[0-9]/, { message: "❌숫자만 넣어주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "❌비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 에러 발생 시 이 필드에 메시지 표시
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(6, { message: "❌아이디는 최소 6글자 이상이여야 합니다." })
    .regex(/[a-zA-Z]/, { message: "❌영문자를 포함해야 합니다." })
    .regex(/[0-9]/, { message: "❌숫자를 포함해야 합니다." }),
  password: z
    .string()
    .min(6, { message: "❌비밀번호는 최소 6자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, { message: "❌영문자를 포함해야 합니다." })
    .regex(/[0-9]/, { message: "❌숫자를 포함해야 합니다." }),
});
