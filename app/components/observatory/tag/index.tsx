"use client"
import { useCore } from "@/app/core";
import { Typography, Box, Stack, Chip } from "@mui/material";
import { useEffect } from "react";

export default function TagComponent() {
    const [{ tag }] = useCore()

    return (
        <>
            {tag.length > 0 && <Box sx={{ borderRadius: 2, background: "#fff", padding: 2, border: "#E9ECEF", borderWidth: "1px", borderStyle: "solid" }}>
                <Typography variant="h3" sx={{ marginBottom: 2 }}>Filtros activados:{tag.length}</Typography>
                {tag.map((item) => <Chip key={item.option} label={`${item.input}: ${item.option}`} variant="filled" sx={{ borderRadios: 4, background: "#E9ECEF" }} />)}
            </Box>}
        </>
    )
}