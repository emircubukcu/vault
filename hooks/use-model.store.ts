import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "helpModal"|"createServer"|"invite"|"editServer"|"members"|"createChannel"|"leaveServer"|"deleteServer"|"deleteChannel"|"editChannel"|"messageFile"|"deleteMessage";

interface ModalData{
    server?:Server;
    channelType?:ChannelType;
    channel?:Channel;
    apiUrl?:string;
    query?:Record<string,any>;
    helpSectionModalInfo?:"createServer"|"inviteFriends"|"joinVC"|"downloadApp"|"finalSection";
}

interface ModalStore{
    type:ModalType|null;
    isOpen:boolean;
    data:ModalData;
    onOpen:(type:ModalType,data?:ModalData)=>void;
    onClose:()=>void;
}

export const useModal=create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    data:{},
    onOpen:(type,data={})=>{set({isOpen:true,type,data})},
    onClose:()=>set({type:null,isOpen:false})
}))