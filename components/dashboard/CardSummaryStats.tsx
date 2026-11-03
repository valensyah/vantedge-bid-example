import { Folder } from "lucide-react";
import type { SummaryEntity } from "@/app/dashboard/types";

export const CardSummaryStats = (props: SummaryEntity) => {
    return (
        <>
            <div className="rounded-xl shadow-md border-[#E5E7EB] p-3 sm:p-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-primary-gray font-inter">{props.title}</p>
                        { props.title.toLowerCase() === "total dokumen" && <Folder width={14.4} height={10.8} stroke="#71717A"/> }
                        { props.title.toLowerCase() === "ingested" && <div className="rounded-full bg-green-500 w-2 h-2"></div> }
                        { props.title.toLowerCase() === "pending" && <div className="rounded-full bg-yellow-500 w-2 h-2"></div> }
                        { props.title.toLowerCase() === "failed" && <div className="rounded-full bg-red-500 w-2 h-2"></div> }
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="font-inter text-xl font-bold text-primary-dark">{props.total}</p>
                        <p className={[
                            "font-inter text-xs", 
                            props.title.toLowerCase() === "ingested" && "text-green-500",
                            props.title.toLowerCase() === "failed" && "text-red-500",
                            props.title.toLowerCase() === "pending" && "text-yellow-500",
                            props.title.toLowerCase() === "total dokumen" && "text-primary-gray"
                            ].join(" ")}>{props.desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSummaryStats