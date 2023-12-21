"use client";
import { useCore } from "@/app/core";
import { BreadcrumbItem } from "@/app/types/countries";
import { Breadcrumbs, Stack, Typography } from "@mui/material";

export default function BreadcrumbComponent() {
  const [{ breadcrumb }, dispatch] = useCore();
  console.log("BREADCRUMB", breadcrumb);
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumb.map((item: BreadcrumbItem, idx: number) => (
          <Typography key={idx}>{item.name}</Typography>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}
