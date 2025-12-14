// 컴포넌트화
import React from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const SignInput = (props) => {
  const {
    icon: Icon,
    register,
    name,
    placeholder,
    type,
    error,
    className,
  } = props;

  const iconClasses = clsx(
    "absolute top-3 left-3 h-5 w-5 pb-1",
    error ? "text-red-500" : "text-gray-400"
  );

  const inputClasses = clsx(
    "m-[1px] pl-9",
    error && "border-red-500 text-red-500",
    className
  );

  return (
    <div className="relative">
      {Icon && <Icon className={iconClasses} />}
      <Input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
};

export default SignInput;
