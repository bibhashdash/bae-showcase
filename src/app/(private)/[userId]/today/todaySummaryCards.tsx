import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TodaySummaryCard} from "@/app/(private)/[userId]/today/todaySummaryCard";

export interface CardData {
    title: string;
    completedItems: number,
    activeItems: number;
}

export const tempData: Array<CardData> = [
    {
        title: "Tasks",
        completedItems: 1,
        activeItems: 4,
    },
    {
        title: "Sub-Tasks",
        completedItems: 2,
        activeItems: 3,
    }
]
export const TodaySummaryCards = ({userId}: { userId: string }) => {
    return (
        <div className="grid grid-cols-auto sm:grid-cols-2 gap-6">
            {
                tempData.map(item => <TodaySummaryCard key={item.title} cardData={item}/> )
            }
        </div>
    )
}