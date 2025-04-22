import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { SignedIn } from "@clerk/nextjs";

import * as motion from "motion/react-client"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <SignedIn>
            <div className="h-full">
                <div className="max-md:hidden md:flex  h-full w-[80px] z-30 flex-col fixed inset-y-0 p-2">
                    <NavigationSideBar />
                </div>
                <motion.div initial={{opacity:0,scale:0.90,filter:"blur(4px)",x:-10}} animate={{opacity:1,x:0,filter:"blur(0px)",scale:1}} transition={{type:"spring",bounce:0,duration:.4}} className="md:pl-[80px] h-full">
                    {children}
                </motion.div>
            </div>
        </SignedIn>
    );
}

export default MainLayout;