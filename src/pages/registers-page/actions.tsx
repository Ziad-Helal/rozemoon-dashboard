import { ChangeUserStatus, DownloadDocuments } from "@/components/table-actions";
import { useGetRegisterDocuments } from "@/queries";
import { getRequest } from "@/services/api";
import { ApiError, UserStatusObj } from "@/types/api-types";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Actions_Props {
  id: number;
  status: UserStatusObj;
}

export default function Actions({ id, status }: Actions_Props) {
  const [documents, setDocuments] = useState<string[]>([]);
  const { mutateAsync: getRegisterDocuments, isPending: isGetingRegisterDocuments } = useGetRegisterDocuments();

  async function downloadDocuments() {
    if (documents.length == 0) {
      const documents = await getRegisterDocuments({ userId: id });
      const files = await Promise.all(documents.slice(-2).map(({ documentUrl }) => getRequest<Blob, ApiError>(baseUrl + documentUrl, { responseType: "blob" })));
      if (files.length) setDocuments(files.map((file) => URL.createObjectURL(file)));
    }
  }

  useEffect(() => {
    return () => {
      documents.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <>
      <DownloadDocuments item="documents" documents={documents} onOpen={downloadDocuments} isLoading={isGetingRegisterDocuments} disabled={isGetingRegisterDocuments} />
      <ChangeUserStatus id={id} status={status.docVerified} />
    </>
  );
}
