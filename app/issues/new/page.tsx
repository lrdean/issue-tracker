"use client";

import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { PiPlaceholder } from "react-icons/pi";

const NewIssuepage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Root placeholder="Title"></TextField.Root>
      </TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuepage;
