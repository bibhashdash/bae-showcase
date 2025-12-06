import {Canvas} from "@/app/(private)/[userId]/inventory/Canvas";


export default async function Inventory() {
    return (
        <div className="w-[80vw] h-[70vh]">
            <Canvas />
        </div>
    )
}