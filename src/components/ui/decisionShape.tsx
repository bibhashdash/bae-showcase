"use client"
import {useState} from "react";
import {CheckIcon, EditIcon} from "lucide-react";

export const DecisionShape = ({}) => {
    const [value, setValue] = useState<string>("");
    const [showInput, setShowInput] = useState<boolean>(true);
    return (
        <div className="w-[300px] h-[300px] border border-gray-800 flex justify-center items-center bg-gray-200"
             style={{clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}>
            {
                showInput
                    ? <div className="w-[80%] flex gap-2 items-center">
                        <input className="h-[40px] w-full border border-gray-400"
                               value={value}
                               onChange={(e) => setValue(e.target.value)}
                        />
                        <CheckIcon role="button" size={20} onClick={() => setShowInput(!showInput)} />
                    </div>
                    : <div className="w-[60%] h-[40%] px-4 overflow-y-auto flex gap-2 items-center justify-center">
                        {value}
                    <EditIcon className="cursor-pointer" role="button" size={20} onClick={() => setShowInput(!showInput)} />
                    </div>}
        </div>
    )
}