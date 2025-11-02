import React, { type JSX } from "react";
import VideoCall from "./_components/video-call";

interface VideoCallPageProps {
  searchParams: Promise<{
    sessionId?: string | undefined;
    token?: string | undefined;
    [key: string]: any;
  }>;
}

const VideoCallPage = async ({ searchParams }: VideoCallPageProps): Promise<JSX.Element> => {
  // await the promised searchParams to satisfy App Router typing checks
  const params = await searchParams;
  const { sessionId, token } = params ?? {};

  return <VideoCall sessionId={sessionId} token={token} />;
};

export default VideoCallPage;
