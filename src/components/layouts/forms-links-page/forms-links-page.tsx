import { Link } from "react-router";

interface FormsLinks_Page_Props {
  routes: {
    label: string;
    route: string;
  }[];
}

export default function FormsLinks_Page({ routes }: FormsLinks_Page_Props) {
  return (
    <section className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {routes.map(({ label, route }) => (
        <Link
          key={route}
          to={route}
          className="capitalize p-2 aspect-video text-center grid items-center bg-primary/10 hover:bg-primary/25 hover:text-primary rounded-lg font-medium shadow-md hover:shadow-none transition"
        >
          {label}
        </Link>
      ))}
    </section>
  );
}
