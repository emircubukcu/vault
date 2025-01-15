import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { SignedIn } from "@clerk/nextjs";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <SignedIn>
            <div className="h-full">
                <div className="max-md:hidden md:flex  h-full w-[80px] z-30 flex-col fixed inset-y-0 p-2">
                    <NavigationSideBar />
                </div>
                <main className="md:pl-[80px] h-full">
                    {children}
                </main>
            </div>
        </SignedIn>
    );
}

export default MainLayout;