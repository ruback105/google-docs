import { useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { FolderIcon } from "@heroicons/react/solid";
import plus from "../public/plus.png";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { Input, Modal, Login, DocumentRow } from "../components";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import Header from "../components/Header";

const Home = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session?.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setShowModal(false);
    setInput("");
  };

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Header />
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="px-2 sm:px-0 sm:max-w-3xl mx-auto">
          <div className="py-6 flex justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <DotsVerticalIcon
              width={20}
              className="text-gray-500 cursor-pointer"
            />
          </div>

          <div
            className="w-40 pb-4 cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <div className="bg-white shadow-sm border-2 hover:border-blue-500 py-20 flex justify-center">
              <Image src={plus} width={60} height={60} />
            </div>
            <p className="px-1 py-2 text-sm font-semibold">Blank</p>
          </div>
        </div>
      </section>
      <section className="bg-white sm:px-10 min-h-[560px]">
        <div className="px-2 sm:max-w-3xl mx-auto pt-8 text-sm text-gray-700 sm:px-4">
          <div className="flex justify-between items-center pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12 ">Date created</p>
            <FolderIcon width={30} className="text-gray-500" />
          </div>
        </div>
        <div className="px-2 sm:px-0 sm:max-w-3xl mx-auto">
          {snapshot?.docs.map((doc) => (
            <div key={doc.id}>
              <DocumentRow
                id={doc.id}
                fileName={doc.data().fileName}
                date={doc.data().timestamp}
              />
            </div>
          ))}
        </div>
      </section>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onCreate={createDocument}
      >
        <Input
          type="text"
          value={input}
          onChange={setInput}
          placeholder="Name of a new document"
          onKeyDown={createDocument}
        />
      </Modal>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}

export default Home;
