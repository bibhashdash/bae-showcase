import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CardData} from "@/app/(private)/[userId]/today/todaySummaryCards";
import {CirclePlus} from "lucide-react";

export const TodaySummaryCard = ({cardData}: {cardData: CardData}) => {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <CardTitle>{cardData.title}</CardTitle>
                <CirclePlus className="cursor-pointer" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 items-center">
                    <label>Active</label>
                    <p className="text-5xl">{cardData.activeItems}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <label>Complete</label>
                    <p className="text-5xl">{cardData.completedItems}</p>
                </div>
            </CardContent>
        </Card>
    )
}