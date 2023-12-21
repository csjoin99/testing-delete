"use client";
import React, { useState } from "react";
import {
  Typography,
  MenuItem,
  MenuList,
  Paper,
  Divider,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";

import Chevron from "./../../../assets/images/icons/chevron-down.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const languages = [
  { id: 1, text: "lenguage 1" },
  { id: 2, text: "lenguage 2" },
  { id: 3, text: "lenguage 3" },
  { id: 4, text: "lenguage 4" },
];

export default function LanguageMenu() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const handleChange = (newLanguage: string) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams?.entries() || [])
    ); // -> has to use this form
    currentParams.set("lang", newLanguage);
    // cast to string
    const search = currentParams.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Stack
        direction={"row"}
        spacing={".5rem"}
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: "#fff",
          padding: "6px 16px",
          borderRadius: "2rem",
        }}
      >
        <Typography variant={"h3"} color="#005A28">
          {searchParams && searchParams.get("lang")
            ? languages.find((e) => `${e.id}` === searchParams.get("lang"))
                ?.text
            : "Language 1"}
        </Typography>
        <Image src={Chevron} alt="seleccione el lenguage" />
      </Stack>

      {isOpen && (
        <ClickAwayListener
          onClickAway={() => {
            setIsOpen(false);
          }}
        >
          <Paper
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 320,
              height: "fit-content",
              transform: "translateY(100%)",
              zIndex: 100,
            }}
          >
            <MenuList>
              {languages.map((e) => (
                <MenuItem
                  key={`${e.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    handleChange(`${e.id}`);
                  }}
                >
                  <Typography variant="body1" component={"p"}>
                    {e.text}
                  </Typography>
                </MenuItem>
              ))}
              <Divider />
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
