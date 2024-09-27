import React from "react";
import { Tooltip, Button } from "@nextui-org/react";

export default function Tool() {
  return (
    <Tooltip showArrow={true} content="I am a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
