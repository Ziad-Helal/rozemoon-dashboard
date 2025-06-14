import { UserCircle2Icon } from "lucide-react";

interface Choosen_User_Props {
  user: { guestName: string; guestPhone: string };
}

export default function Choosen_User({ user }: Choosen_User_Props) {
  const { guestName, guestPhone } = user;
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <UserCircle2Icon size={50} />
      <div>
        <p className="text-lg">{guestName}</p>
        <p className="text-muted-foreground">{guestPhone}</p>
      </div>
    </div>
  );
}
