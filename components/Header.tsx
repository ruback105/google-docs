import React from "react";
import { MenuIcon, CogIcon } from "@heroicons/react/outline";
import { DocumentTextIcon, SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

export type IHeaderProps = {};

const Header: React.FC<IHeaderProps> = ({}) => {
  const [session] = useSession();
  const router = useRouter();

  if (session)
    return (
      <div className="sticky top-0 flex items-center z-50 w-full py-4 shadow-md bg-white">
        <div className="px-4 flex w-full">
          <div className="flex items-center mr-5 md:mr-10">
            <MenuIcon
              width={20}
              className="mr-1 cursor-pointer text-gray-500"
            />
            <div
              className="hidden sm:flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <DocumentTextIcon width={40} className="text-blue-500" />
              <p className="text-xl text-gray-600">Docs</p>
            </div>
          </div>

          <div className="flex items-center flex-grow px-4 md:mx-10 bg-gray-100 text-gray-600 rounded-md shadow-sm focus-within:shadow-md">
            <SearchIcon width={20} className="mr-2 text-gray-500" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="hidden sm:block w-full text-xs sm:text-base px-5 bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center ml-5 md:ml-10">
            <CogIcon width={30} className="text-gray-500 cursor-pointer mr-2" />
            <Image
              src={session.user?.image}
              alt="Picture of the author"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              objectPosition="center"
              objectFit="cover"
              onClick={() => signOut}
            />
          </div>
        </div>
      </div>
    );

  return null;
};

export default Header;
