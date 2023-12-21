import { Box, Container, Stack } from "@mui/material";
import React from "react";
import MainLogo from "../../../assets/images/main-logo.svg";
import Image from "next/image";
import NavLink from "../navLink";
import LanguageMenu from "../languageMenu";

export default function Header() {
  return (
    <Box sx={{ boxShadow: 3, backgroundColor: "#fff" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"}>
          <Box>
            <Image src={MainLogo} alt="Logo" />
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={"40px"}>
          <NavLink path="/" text="Observatorio" />
          <NavLink path="/paises" text="Países" />
          <NavLink
            path="/acerca-del-observatorio"
            text="Acerca del observatorio"
          />
        </Stack>
        <Box
          sx={{
            backgroundColor: "#7BBF47",
            borderTopLeftRadius: "60px",
            borderBottomLeftRadius: "60px",
            padding: "32px",
          }}
        >
          <LanguageMenu />
        </Box>
      </Stack>
    </Box>
  );
}
