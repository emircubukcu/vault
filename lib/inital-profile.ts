import {currentUser} from "@clerk/nextjs/server"
import {db} from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export const initialProfile = async ()=>{
    const user=await currentUser()
    if(!user){
        return redirect("/home");
        // return RedirectToSignIn
    }
    const profile=await db.profile.findUnique({
        where:{
            userID:user.id
        }
    })
    if(profile){
        return profile
    }
    const newProfile= await db.profile.create({
        data:{
            userID:user.id,
            name:`${user.firstName} ${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    })
    return newProfile
}
