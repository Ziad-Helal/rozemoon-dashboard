import { Skeleton } from "@/components/ui";

export default function Paginator_Skeleton() {
	return (
		<div className="mt-3 flex max-lg:flex-col-reverse gap-2 items-center justify-between">
			<div className="flex max-sm:flex-col gap-2 items-center">
				<div className="flex gap-2 items-center">
					<Skeleton className="h-6 w-14" />
					<Skeleton className="h-8 w-20" />
				</div>
				<Skeleton className="h-6 w-64" />
			</div>
			<Skeleton className="h-6 w-52" />
		</div>
	);
}
