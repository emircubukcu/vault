import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import * as motion from "motion/react-client"

const ServerIdLayout = async ({
    children,
    params,
}: { children: React.ReactNode; params: { serverId: string } }) => {
    const profile = await currentProfile()
    const {serverId}=await params
    if (!profile) {
        return RedirectToSignIn;
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        return redirect("/home")
    }

    return (
        <div className="h-full">
            <div className="max-md:hidden md:flex h-full w-60 z-30 flex-col fixed inset-y-0 py-2 pr-2">
                <ServerSidebar serverId={serverId}/>
            </div>
            <motion.div key={serverId} initial={{scale:0.95,opacity:0,filter:"blur(2px)"}} animate={{scale:1,opacity:1,filter:"blur(0px)"}} transition={{duration:0.8,type:"spring",bounce:0}} className="h-full md:pl-60 md:py-2 md:pr-2 z-20 relative">
                {children}
            </motion.div>
        </div>
    );
}

export default ServerIdLayout;