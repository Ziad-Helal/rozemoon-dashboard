import { Image } from "@/components/misc";

interface DamageFeedback_Props {
  reason?: string;
  damageImages?: string[];
  className?: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL + "StaticFiles/Images/";

export default function DamageFeedback({ reason, damageImages, className }: DamageFeedback_Props) {
  return (
    <div className={className}>
      <div className="grid lg:grid-cols-[1fr_20rem] gap-3">
        <p>{reason}</p>
        <div className="flex flex-row-reverse gap-2 *:size-40">
          {damageImages?.map((image, index) => (
            <Image key={image} src={baseUrl + image} alt={reason + " " + (index + 1)} />
          ))}
        </div>
      </div>
    </div>
  );
}
