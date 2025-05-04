export default function NotFound_Page() {
	return (
		<div className="h-full flex flex-col gap-2 items-center justify-center">
			<span className="text-9xl font-semibold text-destructive">400</span>
			<p className="text-2xl font-medium uppercase text-muted-foreground mt-3">this page could not be found</p>
			<p className="text-xl uppercase text-muted-foreground">or you do not have permission</p>
		</div>
	);
}
