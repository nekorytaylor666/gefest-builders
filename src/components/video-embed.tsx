import React from "react";
// "https://www.loom.com/embed/6a4849c151414a6cba5405c723b4bd66?sid=a9231bea-21f2-4690-a27e-dcb8bf4ca010";
const VideoEmbed = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div
      className="my-8"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        src={videoUrl}
        // @ts-ignore
        frameBorder="0"
        // @ts-ignore
        webkitallowfullscreen
        // @ts-ignore
        mozallowfullscreen
        // @ts-ignore
        allowfullscreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default VideoEmbed;
