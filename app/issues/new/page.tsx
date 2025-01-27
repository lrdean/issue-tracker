"use client";
import dynamic from "next/dynamic";
/*import SimpleMDE from "react-simplemde-editor"; */
import "easymde/dist/easymde.min.css";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
/*import { PiPlaceholder } from "react-icons/pi";*/
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issueschema } from "@/app/validationschema";
import { z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import { Spinnaker } from "next/font/google";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Disable server-side rendering for this component
});

type IssueForm = z.infer<typeof Issueschema>;
/*interface IssueForm {
  title: string;
  description: string;
}*/

const NewIssuepage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(Issueschema),
  });
  console.log(register("title"), control, handleSubmit);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <div className="max-w-xl">
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error has occurred.");
          }
        })}
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
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuepage;
