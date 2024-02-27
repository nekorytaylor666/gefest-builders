import { getEmbedUrlFromLoomUrl } from "@/components/editor/extensions/loom-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import VideoClient from "./videoClient";

const VideoTool = ({
  value = "",
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => {
  const [url, setUrl] = useState<string>(value);

  const embedUrl = getEmbedUrlFromLoomUrl(url);
  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-bold">Вставьте ссылку на видео</h1>
      </CardHeader>
      <CardContent>
        <Label>Ссылка</Label>
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></Input>
        <VideoClient value={url} />
      </CardContent>
      <CardFooter className="flex items-center gap-4 justify-end">
        <Button onClick={() => onValueChange(url)}>Сохранить</Button>
      </CardFooter>
    </Card>
  );
};

export default VideoTool;
