import { createUser } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { ApiError, CreateUser_Request, CreateUser_Response } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export function useCreateUser() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateUser_Response, AxiosError<ApiError, CreateUser_Request>, CreateUser_Request>({
    mutationFn: (requestBody) => createUser(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createUser"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
