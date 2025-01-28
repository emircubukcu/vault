import { useModal } from "@/hooks/use-model.store";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { CreateServerHomeModal } from "./home-modals/createServer-home";
import { DownloadAppHome } from "./home-modals/downloadApp-home";
import { InviteFriendsHome } from "./home-modals/inviteFriends-home";
import { JoinVCHome } from "./home-modals/joinVC-home";

export const HelpModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { helpSectionModalInfo } = data;
    const isModalOpen = isOpen && type === "helpModal"

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#1E1F22] dark:text-white text-black py-5 px-2 w-[90dvw] h-[90dvh] md:w-[75dvw] md:h-[55dvh]  max-w-full max-h-full flex">
                {
                    helpSectionModalInfo === "createServer" ? (<><CreateServerHomeModal /></>) :
                    helpSectionModalInfo === "downloadApp" ? (<><DownloadAppHome /></>) :
                    helpSectionModalInfo === "inviteFriends" ? (<><InviteFriendsHome /></>) :
                    helpSectionModalInfo === "joinVC" ? (<><JoinVCHome /></>) : (<></>)
                }
            </DialogContent>
        </Dialog>
    )
}