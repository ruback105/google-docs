import { getSession, useSession, signOut } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { UserIcon } from "@heroicons/react/solid";
import { Login } from "../../components";
import TextEditor from "../../components/TextEditor";
import { DocumentTextIcon } from "@heroicons/react/solid";
import Image from "next/image";

export type DocumentProps = {};

const Document: React.FC<DocumentProps> = ({ session }) => {
  const router = useRouter();
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session?.user.email)
      .collection("docs")
      .doc(router.query.id)
  );

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-6 bg-white shadow-md">
        <div className="flex justify-start">
          <DocumentTextIcon width={40} className="text-blue-500" />
          <div className="flex flex-col items-start py-2">
            <h2 className="px-2">
              {snapshot?.data().fileName
                ? snapshot?.data().fileName
                : "Loading..."}
            </h2>
            <div className="flex items-center space-x-4 w-full text-gray-600">
              <p className="option">File</p>
              <p className="option">Edit</p>
              <p className="option">View</p>
              <p className="option">Insert</p>
              <p className="option">Format</p>
              <p className="option">Tools</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <button className="flex items-center px-5 py-3 bg-blue-500 rounded-xl text-white mr-4">
            <UserIcon width={20} height={20} className="" />
            <p className="text-sm font-semibold ml-2">SHARE</p>
          </button>
          <Image
            src={session.user?.image}
            alt="Picture of the author"
            width={44}
            height={44}
            className="rounded-full"
            objectFit="cover"
            onClick={() => signOut}
          />
        </div>
      </nav>

      <div>
        <div>
          <TextEditor id={router.query.id} />
        </div>
      </div>
    </div>
  );
};

export default Document;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
