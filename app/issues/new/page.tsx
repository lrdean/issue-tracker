"use client";
import dynamic from "next/dynamic";
/*import SimpleMDE from "react-simplemde-editor"; */
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { PiPlaceholder } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import { title } from "process";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Disable server-side rendering for this component
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuepage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" size="2" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={() => {
          handleSubmit(async (data) => {
            try {
              await axios.post("/api/issues", data);
              router.push("/issues");
            } catch (error) {
              setError("An unexpected error has occurred.");
            }
          });
        }}
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              options={{ placeholder: "Description" }}
            />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuepage;
