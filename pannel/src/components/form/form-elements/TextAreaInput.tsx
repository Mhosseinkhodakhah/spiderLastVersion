import { useState } from "react";
import { FormikProps } from "formik";

import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface ITextAreaInput {
  title?: string | undefined;
  name: string;
  formik: FormikProps<any>;
  error?: boolean;
  hint?: string;
}

export default function TextAreaInput({
  title,
  name,
  formik,
  error,
  hint,
}: ITextAreaInput) {
  const [message, setMessage] = useState("");

  return (
    <ComponentCard title={title ? title : ""}>
      <div className="space-y-6 mt-4">
        {/* Default TextArea */}
        <div>
          <Label>{title?.split(" ")[0]}</Label>
          <TextArea
            name={name}
            formik={formik}
            value={message}
            onChange={(value) => setMessage(value)}
            rows={12}
            error={error}
            hint={hint}
          />
        </div>

        {/* Disabled TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea rows={6} disabled />
        </div> */}

        {/* Error TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Please enter a valid message."
          />
        </div> */}
      </div>
    </ComponentCard>
  );
}
