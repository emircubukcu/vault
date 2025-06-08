import {auth} from "@clerk/nextjs/server"
import {db} from "@/lib/db"
import { initialProfile } from "./inital-profile"

export const currentProfile = async ()=>{
    const {userId}=await auth()
    if(!userId){
        return null;
    }

    const profile=await db.profile.findUnique({
        where:{
            userID:userId
        }
    })
    if(profile){
        return profile;
    }
    return initialProfile()
}