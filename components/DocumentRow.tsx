import React from "react";
import { DocumentTextIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";

export type DocumentRowProps = {
  id: string;
  fileName: string;
  date: Date;
};

const DocumentRow: React.FC<DocumentRowProps> = ({ id, fileName, date }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex items-center rounded-lg hover:bg-gray-100 sm:p-4 py-4  text-gray-700"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <DocumentTextIcon width={40} height={40} className="text-blue-500" />
      <p className="flex-grow ml-1 truncate">{fileName}</p>
      <p className="text-sm text-gray-500 mr-16">
        {date?.toDate().toLocaleDateString()}
      </p>
      <DotsVerticalIcon
        width={20}
        height={20}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default DocumentRow;
