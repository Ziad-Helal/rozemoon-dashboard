import { Skeleton } from "@/components/ui";
import { defaultPageSize } from "@/lib/constants";
import { getRandomInteger } from "@/lib/utils";

interface DataTable_Skeleton_Props {
	columnsCount: number;
}

export default function DataTable_Skeleton({ columnsCount }: DataTable_Skeleton_Props) {
	const rows = +localStorage.getItem("pageSize")! || defaultPageSize;

	return (
		<div className="border-none">
			<div className="border rounded">
				<div className="grid grid-rows-[40px] items-center" style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}>
					{Array(columnsCount)
						.fill(0)
						.map((_, index) => (
							<div key={index} className="p-2">
								<Skeleton className="h-5" style={{ width: getRandomInteger(50, 100) + "%" }} />
							</div>
						))}
				</div>
				<div className="grid items-center" style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, 37px)` }}>
					{Array(columnsCount * rows)
						.fill(0)
						.map((_, index) => (
							<div key={index} className="border-t h-full grid items-center p-2">
								<Skeleton className="h-4" style={{ width: getRandomInteger(50, 100) + "%" }} />
							</div>
						))}
				</div>
			</div>
			<Skeleton className="h-4 w-40 mt-1" />
		</div>
	);
}
