import { ReactNode } from "react";

interface Form_Page_Props {
  heading: string;
  children: ReactNode;
  quickActions?: ReactNode;
}

export default function Form_Page({ heading, children, quickActions }: Form_Page_Props) {
  return (
    <section>
      <header className="flex gap-3 items-center justify-between mb-3 lg:mb-6">
        <h2 className="capitalize font-medium text-2xl lg:text-4xl">{heading}</h2>
        <div className="flex items-center gap-2">{quickActions}</div>
      </header>
      {children}
    </section>
  );
}
