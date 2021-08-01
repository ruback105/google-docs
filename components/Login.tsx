import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/client";

export type ILoginProps = {};

const Login: React.FC<ILoginProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image src="/docs.png" width={200} height={200} objectFit="contain" />
      <h2 className="my-5 text-gray-500 text-2xl">
        <span className="text-gray-700">Google </span>Docs
      </h2>
      <button
        className="mt-2 px-10 py-3 text-center bg-blue-500 rounded-md shadow-sm text-white"
        onClick={signIn}
      >
        Login
      </button>
    </div>
  );
};

export { Login };
