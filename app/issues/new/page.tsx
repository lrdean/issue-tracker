"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { PiPlaceholder } from "react-icons/pi";

const NewIssuepage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Root placeholder="Title"></TextField.Root>
      </TextField.Root>
      <SimpleMDE placeholder="Description"></SimpleMDE>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuepage;
