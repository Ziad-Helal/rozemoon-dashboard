import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { ForwardedRef, forwardRef, ReactNode } from "react";

type ToolTip_Props = {
  trigger: ReactNode;
  content: ReactNode;
};

export const ToolTip = forwardRef(({ trigger, content }: ToolTip_Props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent ref={ref} className="px-2 py-1 bg-popover text-muted-foreground border border-input max-w-sm">
        {typeof content === "string" ? <p className="capitalize">{content}</p> : content}
      </TooltipContent>
    </Tooltip>
  );
});
