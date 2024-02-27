import { getEmbedUrlFromLoomUrl } from "@/components/editor/extensions/loom-utils";
import React from "react";

const VideoClient = ({ value }: { value: string }) => {
  const embedUrl = getEmbedUrlFromLoomUrl(value);
  return (
    <div
      data-loom-video=""
      className="aspect-video rounded-lg overflow-hidden bg-zinc-300"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        allowFullScreen
        //@ts-ignore
        autoPlay
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        src={embedUrl ?? ""}
      ></iframe>
    </div>
  );
};

export default VideoClient;
