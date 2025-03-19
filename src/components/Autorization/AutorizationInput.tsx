import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

function AutorizationInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}

export default AutorizationInput;
