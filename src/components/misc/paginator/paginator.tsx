import { ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { formatNumber, handleDirectionChange, Language } from "@/localization";
import { LoadingSpinner, ToolTip } from "@/components";
import { Pagination } from "@/types/api-types";
import { Paginator_Skeleton } from "./components";
import { defaultPagination } from "@/lib/constants";

const pagesSizes = [
	{ label: 10, value: 10 },
	{ label: 25, value: 25 },
	{ label: 50, value: 50 },
	{ label: 75, value: 75 },
	{ label: 100, value: 100 },
];

export interface Pagination_Props {
	children: ReactNode;
	isLoading: boolean;
	isEmpty: boolean;
	changePagination: (pagination: Pagination) => void;
	paginationData?: Pagination;
	className?: string;
	listClassName?: string;
}

export default function Paginator({ children, isLoading, isEmpty, paginationData = defaultPagination, changePagination, className = "", listClassName = "" }: Pagination_Props) {
	const { t, i18n } = useTranslation();
	const arrowsClassname = handleDirectionChange(i18n.dir(), "", "rotate-180");
	const { pageNumber, pageSize, totalCount, totalPages } = paginationData;
	const from = (pageNumber! - 1) * pageSize! + 1;
	const maxTo = pageNumber! * pageSize!;
	const to = maxTo > totalCount! ? totalCount! : maxTo;

	function pageNumberChangeHandler(pageNumber: number) {
		changePagination({ ...paginationData, pageNumber });
	}

	function pageSizeChangeHandler(pageSize: number) {
		changePagination({ ...paginationData, pageSize });
	}

	return (
		<div className={className}>
			{isLoading && !isEmpty && (
				<div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-20 rounded-md animate-pulse">
					<LoadingSpinner loadingText="loading" />
				</div>
			)}
			<div className={listClassName}>{children}</div>
			{isLoading && isEmpty ? (
				<Paginator_Skeleton />
			) : (
				to >= from && (
					<div className={"mt-3 text-sm flex max-lg:flex-col-reverse gap-x-4 items-center justify-between"}>
						<p className="sm:flex gap-1 items-center text-muted-foreground">
							<span className="flex gap-1 items-center">
								<span className="capitalize">{t("paginator.results.s1.1")}</span>
								<DropdownMenu dir={i18n.dir()}>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" rightIcon={ChevronsUpDownIcon} className="text-foreground">
											{formatNumber(i18n.language as Language, pageSize!, "decimal")}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="max-h-80 overflow-auto capitalize">
										{pagesSizes.map(({ label, value }) => (
											<DropdownMenuCheckboxItem
												key={value}
												checked={value == pageSize}
												onCheckedChange={() => {
													localStorage.setItem("pageSize", value.toString());
													pageSizeChangeHandler(+value);
												}}>
												{formatNumber(i18n.language as Language, label, "decimal")}
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								<span>
									{i18n.language == "ar" ? (pageSize! > 10 ? t("paginator.results.s1.2.result") : t("paginator.results.s1.2.results")) : t("paginator.results.s1.2.results")}{" "}
									{t("paginator.results.s1.3")}
								</span>
							</span>
							<span>
								{t("paginator.results.s2.1")} <span className="text-foreground">{formatNumber(i18n.language as Language, from, "decimal")}</span> {t("paginator.results.s2.2")}{" "}
								<span className="text-foreground">{formatNumber(i18n.language as Language, to, "decimal")}</span> {t("paginator.results.s2.3")}{" "}
								<span className="text-foreground">{formatNumber(i18n.language as Language, totalCount!, "decimal")}</span>.
							</span>
						</p>
						<div className="flex items-center">
							<ToolTip
								content={t("paginator.pages.first")}
								trigger={
									<Button
										variant="ghost"
										size="icon"
										className="size-8"
										icon={ChevronsLeftIcon}
										iconClassName={arrowsClassname}
										onClick={() => pageNumberChangeHandler(1)}
										disabled={pageNumber == 1}>
										{t("paginator.pages.first")}
									</Button>
								}
							/>
							<ToolTip
								content={t("paginator.pages.previous")}
								trigger={
									<Button
										variant="ghost"
										size="icon"
										className="size-8"
										icon={ChevronLeftIcon}
										iconClassName={arrowsClassname}
										onClick={() => pageNumberChangeHandler(pageNumber! - 1)}
										disabled={pageNumber == 1}>
										{t("paginator.pages.previous")}
									</Button>
								}
							/>
							<p className="mx-2.5">
								<span className="text-primary font-medium">{formatNumber(i18n.language as Language, pageNumber!, "decimal")}</span>{" "}
								<span className="text-muted-foreground">
									{t("paginator.pages.of")} {formatNumber(i18n.language as Language, totalPages!, "decimal")}
								</span>
							</p>
							<ToolTip
								content={t("paginator.pages.next")}
								trigger={
									<Button
										variant="ghost"
										size="icon"
										className="size-8"
										icon={ChevronRightIcon}
										iconClassName={arrowsClassname}
										onClick={() => pageNumberChangeHandler(pageNumber! + 1)}
										disabled={pageNumber! >= totalPages!}>
										{t("paginator.pages.next")}
									</Button>
								}
							/>
							<ToolTip
								content={t("paginator.pages.last")}
								trigger={
									<Button
										variant="ghost"
										size="icon"
										className="size-8"
										icon={ChevronsRightIcon}
										iconClassName={arrowsClassname}
										onClick={() => pageNumberChangeHandler(totalPages!)}
										disabled={pageNumber! >= totalPages!}>
										{t("paginator.pages.last")}
									</Button>
								}
							/>
						</div>
					</div>
				)
			)}
		</div>
	);
}
