"use client"

import { useEffect, useRef, useState } from "react"
import { AudioTrack, BarVisualizer, CarouselLayout, Chat, ConnectionState, ConnectionStateToast, ControlBar, FocusLayout, FocusLayoutContainer, GridLayout, isTrackReference, LayoutContextProvider, LiveKitRoom, ParticipantAudioTile, ParticipantLoop, ParticipantName, ParticipantPlaceholder, ParticipantTile, RoomAudioRenderer, RoomName, TrackLoop, TrackRefContext, TrackReferenceOrPlaceholder, useCreateLayoutContext, useParticipants, usePinnedTracks, useTracks, VideoConference, VideoConferenceProps, VideoTrack, WidgetState } from "@livekit/components-react"
import "@livekit/components-styles";
import { isEqualTrackRef } from '@livekit/components-core';
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2, Video } from "lucide-react";
import { RoomEvent, Track } from "livekit-client";
import { Slider } from "./ui/slider";


interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export function isWeb(): boolean {
    return typeof document !== 'undefined';
}

export function VideoConference2({
    chatMessageFormatter,
    chatMessageDecoder,
    chatMessageEncoder,
    SettingsComponent,
    ...props
}: VideoConferenceProps) {
    const [widgetState, setWidgetState] = useState<WidgetState>({
        showChat: false,
        unreadMessages: 0,
        showSettings: false,
    });
    const lastAutoFocusedScreenShareTrack = useRef<TrackReferenceOrPlaceholder | null>(null);

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
    );

    const widgetUpdate = (state: WidgetState) => {
        //log.debug('updating widget state', state);
        setWidgetState(state);
    };

    const layoutContext = useCreateLayoutContext();

    const screenShareTracks = tracks
        .filter(isTrackReference)
        .filter((track) => track.publication.source === Track.Source.ScreenShare);

    const focusTrack = usePinnedTracks(layoutContext)?.[0];
    const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

    useEffect(() => {
        // If screen share tracks are published, and no pin is set explicitly, auto set the screen share.
        if (
            screenShareTracks.some((track) => track.publication.isSubscribed) &&
            lastAutoFocusedScreenShareTrack.current === null
        ) {
            //log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
            layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
            lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
        } else if (
            lastAutoFocusedScreenShareTrack.current &&
            !screenShareTracks.some(
                (track) =>
                    track.publication.trackSid ===
                    lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
            )
        ) {
            //log.debug('Auto clearing screen share focus.');
            layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
            lastAutoFocusedScreenShareTrack.current = null;
        }
        if (focusTrack && !isTrackReference(focusTrack)) {
            const updatedFocusTrack = tracks.find(
                (tr) =>
                    tr.participant.identity === focusTrack.participant.identity &&
                    tr.source === focusTrack.source,
            );
            if (updatedFocusTrack !== focusTrack && isTrackReference(updatedFocusTrack)) {
                layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: updatedFocusTrack });
            }
        }
    }, [
        screenShareTracks
            .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
            .join(),
        focusTrack?.publication?.trackSid,
        tracks,
    ]);

    //useWarnAboutMissingStyles();

    return (
        <div className="lk-video-conference" {...props}>
            {isWeb() && (
                <LayoutContextProvider
                    value={layoutContext}
                    // onPinChange={handleFocusStateChange}
                    onWidgetChange={widgetUpdate}
                >
                    <div className="lk-video-conference-inner">
                        {!focusTrack ? (
                            <div className="lk-grid-layout-wrapper">
                                <GridLayout tracks={tracks}>
                                    <ParticipantTile />
                                </GridLayout>
                            </div>
                        ) : (
                            <div className="lk-focus-layout-wrapper">
                                <FocusLayoutContainer>
                                    <CarouselLayout tracks={carouselTracks}>
                                        <ParticipantTile />
                                        <Slider defaultValue={[33]} max={100} step={1} />
                                    </CarouselLayout>
                                    {focusTrack && <FocusLayout trackRef={focusTrack} />}
                                </FocusLayoutContainer>
                            </div>
                        )}
                        <ControlBar controls={{ chat: true, settings: !!SettingsComponent }} />
                    </div>
                    <Chat
                        style={{ display: widgetState.showChat ? 'grid' : 'none' }}
                        messageFormatter={chatMessageFormatter}
                        messageEncoder={chatMessageEncoder}
                        messageDecoder={chatMessageDecoder}
                    />
                    {SettingsComponent && (
                        <div
                            className="lk-settings-menu-modal"
                            style={{ display: widgetState.showSettings ? 'block' : 'none' }}
                        >
                            <SettingsComponent />
                        </div>
                    )}
                </LayoutContextProvider>
            )}
            <RoomAudioRenderer />
            <ConnectionStateToast />
        </div>
    );
}


export const MediaRoom = ({
    chatId, video, audio
}: MediaRoomProps) => {

    const { user } = useUser()
    const [token, setToken] = useState("")

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await resp.json()
                setToken(data.token)
            }
            catch (e) {
                console.log(e);
            }
        })()

    }, [user?.firstName, user?.lastName, chatId]);



    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Yükleniyor</p>
            </div>
        )
    }

    return (
        <LiveKitRoom data-lk-theme="default" serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} token={token} connect={true} video={video} audio={audio}>
            <VideoConference />
        </LiveKitRoom>
    )
}