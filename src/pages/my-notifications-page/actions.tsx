import { ReadNotification } from "@/components/table-actions";

export interface Actions_Props {
  id: number;
  title: string;
}

export default function Actions({ id, title }: Actions_Props) {
  return <ReadNotification id={id} title={title} />;
}
