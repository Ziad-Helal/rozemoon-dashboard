import { Image } from "@/components";
import { cn } from "@/lib/utils";
import { routes } from "@/routes";
import { Link } from "react-router";

interface Logo_Props {
  className?: string;
  long?: boolean;
}

export default function Logo({ className, long }: Logo_Props) {
  //   const { systemTheme } = useTheme();

  return (
    <Link to={routes.home} className={cn("flex w-fit items-center gap-1.5", className)}>
      {/* <Image src={`/logo-${systemTheme}${long ? `-${i18n.language == "ar" ? "ar" : "en"}` : ""}.svg`} alt={t("name")} /> */}
      <Image src={`/logo.png`} containerProps={{ className: "size-8 sm:size-10 bg-white p-1 rounded-full" }} alt="Roze Moon" />
      {long ? <h1 className="capitalize text-xl sm:text-2xl text-primary whitespace-nowrap">Roze Moon</h1> : null}
    </Link>
  );
}
