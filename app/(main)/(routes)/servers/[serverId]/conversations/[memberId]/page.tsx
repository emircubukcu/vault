import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: Promise<{
        memberId: string;
        serverId: string;
    }>,
    searchParams: Promise<{
        video?: boolean
    }>
}

const MemberIdPage = async ({
    params,
    searchParams
}: MemberIdPageProps) => {
    const profile = await currentProfile()

    const {memberId,serverId}=await params
    const {video}=await searchParams

    if (!profile) {
        return RedirectToSignIn;
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id
        },
        include: {
            profile: true
        }
    })
    if (!currentMember) {
        return redirect("/home")
    }

    const conversation = await getOrCreateConversation(currentMember.id, memberId)

    if (!conversation) {
        return redirect(`/servers/${serverId}`);
    }
    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#2B2D31] flex flex-col h-full rounded-md">
            <ChatHeader imageUrl={otherMember.profile.imageUrl} name={otherMember.profile.name} serverId={serverId} type="conversation" />
            {!video && (
                <>
                    <ChatMessages member={currentMember} name={otherMember.profile.name} chatId={conversation.id} type="conversation" apiUrl="/api/direct-messages" paramKey="conversationId" paramValue={conversation.id} socketUrl="/api/socket/direct-messages" socketQuery={{ conversationId: conversation.id }} />
                    <ChatInput name={otherMember.profile.name} type="conversation" apiUrl="/api/socket/direct-messages" query={{ conversationId: conversation.id }} />
                </>
            )}
            {video && (
                <MediaRoom chatId={conversation.id} video={true} audio={true} />
            )}
        </div>
    );
}

export default MemberIdPage;