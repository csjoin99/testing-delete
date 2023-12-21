import React, { useEffect, useState } from "react";
import { Box, IconButton, Input, InputLabel, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import { FieldError } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  label?: string;
  outlineColor?: string;
  multiline?: boolean;
  type: "text" | "password";
  rows?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  error?: FieldError | undefined;
  placeholder: string;
  maxLength?: number | null;
  // lengthAlert?: {length:number, message:string} | null
  lengthAlertHandler?: { handler: (e: boolean) => void; length: number } | null;
  hasLabel?: boolean;
  disabled?: boolean;
  icon?: string;
}
export default function CustomInput({
  label,
  multiline = false,
  rows = 1,
  value,
  onChange,
  error,
  type,
  placeholder,
  maxLength = null,
  lengthAlertHandler,
  hasLabel = true,
  disabled = false,
  icon,
}: // lengthAlert = null
Props) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    if (lengthAlertHandler) {
      if (value && value.length >= lengthAlertHandler.length) {
        lengthAlertHandler.handler(true);
      } else {
        lengthAlertHandler.handler(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        marginBottom: "24px"
      }}
    >
      {hasLabel && (
        <InputLabel
          sx={(theme) => ({
            marginBottom: ".25rem",
            marginLeft: ".8rem",
          })}
        >
          {label}
        </InputLabel>
      )}
      <Input
        type={passwordVisible ? "text" : type}
        value={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          onChange(e);
        }}
        multiline={multiline}
        rows={rows}
        sx={(theme) => ({
          position: "relative",
          "&: after": {
            display: "none",
          },
          "&: before": {
            display: "none",
          },

          "& .MuiInputBase-input": {
            position: "relative",
            fontSize: 16,
            width: "100%",
            padding: "10px 12px",
            // Use the system font instead of the default Roboto font.
            fontFamily: "OpenSans",
          },
        })}
        placeholder={placeholder}
        disabled={disabled}
        endAdornment={
          type === "password" ? (
            <Box
              onClick={() => setPasswordVisible(!passwordVisible)}
              sx={(theme) => ({
                cursor: "pointer",
                color: theme.palette.primary.main,
                position: "absolute",
                top: "10px",
                right: "10px",
              })}
            >
              <RemoveRedEyeIcon />
            </Box>
          ) : null
        }
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        {icon === "search" ? <Search /> : <ExpandMoreIcon />}
      </IconButton>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", marginTop: "5px" }}
      >
        {error && (
          <Typography
            sx={{ marginLeft: ".8rem", fontSize: 12 }}
            color={"error"}
          >
            {error.message}
          </Typography>
        )}
        {/* {(value && lengthAlert && value.length >= lengthAlert?.length) && (
          <Typography
            sx={{ marginLeft: ".8rem", fontSize: 12 }}
            color={"info"}
          >
            {lengthAlert.message}
          </Typography>
        )} */}
        {maxLength && (
          <Stack direction="row" sx={{ justifyContent: "flex-end", flex: 1 }}>
            <Typography variant={"body1"} fontSize={"10px"}>
              {`${value ? value.length : 0}/${maxLength}`}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
