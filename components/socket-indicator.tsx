"use client"

import { useSocket } from "@/components/ui/providers/socket-provider"
import{Badge} from "@/components/ui/badge"

export const SocketIndicator=()=>{
    const {isConnected}=useSocket()

    if(!isConnected){
        return(
            <div className="rounded-full w-2 h-2 bg-yellow-600 text-white border-none">
                
            </div>
        )
    }
    return(
        <div className="rounded-full w-2 h-2 bg-emerald-600 text-white border-none">
            
        </div>
    )
}