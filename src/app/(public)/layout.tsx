import {ReactNode} from "react";

export default function AuthLayout ({children}: {children: ReactNode}) {
    return <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl">
            {children}
        </div>
    </div>
}