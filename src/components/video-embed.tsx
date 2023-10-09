import React from "react";

const VideoEmbed = React.memo(
  ({ videoUrl }: { videoUrl: string }) => {
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
  },
  (prevProp, nextProp) => {
    console.log(prevProp, nextProp, prevProp === nextProp);
    return true;
  }
);

VideoEmbed.displayName = "VideoEmbed";

export default VideoEmbed;
