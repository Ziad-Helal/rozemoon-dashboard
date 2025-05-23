import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
	</div>
));
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
	<tr ref={ref} className={cn("group border-b transition-colors [&:hover>*]:bg-[#ebecec] dark:[&:hover>*]:bg-[#0e1725] data-[state=selected]:border-b-0", className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
	<th ref={ref} className={cn("h-10 px-2 text-start align-middle font-medium text-muted-foreground [&>[role=checkbox]]:translate-y-[2px]", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
	<td ref={ref} className={cn("p-2 align-middle whitespace-nowrap [&>[role=checkbox]]:translate-y-[2px] group-data-[state=selected]:bg-muted", className)} {...props} />
));
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
