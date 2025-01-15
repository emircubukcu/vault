import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
            <div className="max-md:hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 py-2 pr-2">
                <ServerSidebar serverId={serverId}/>
            </div>
            <main className="h-full md:pl-60 md:py-2 md:pr-2 ">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;