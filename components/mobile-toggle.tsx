import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar"
import { ServerSidebar } from "@/components/server/server-sidebar"

export const MobileToggle = ({serverId}:{serverId:string}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent showClose={false} side="left" className="p-2 flex gap-0 border-transparent bg-transparent">
                <div className="w-[72px] mr-2">
                    <NavigationSideBar />
                </div>
                <ServerSidebar serverId={serverId}/>
            </SheetContent>
        </Sheet>
    )
}