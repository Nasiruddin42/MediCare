import React, { type JSX } from "react";
import VideoCall from "./_components/video-call";

interface VideoCallPageProps {
  searchParams: {
    sessionId?: string | undefined;
    token?: string | undefined;
    [key: string]: any;
  };
}

const VideoCallPage = async ({ searchParams }: VideoCallPageProps): Promise<JSX.Element> => {
  // searchParams is a plain object provided by Next.js — do not await it
  const { sessionId, token } = searchParams ?? {};

  return <VideoCall sessionId={sessionId} token={token} />;
};

export default VideoCallPage;
