import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} id={field.name} />
      {error ? <div>{error}</div> : null}
    </div>
  );
};
