import { TooltipData } from "@/app/types/countries";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
    data:TooltipData
}
export default function Tooltip({
  data
}: Props) {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        background: "#fff",
        padding: "8px",
        width: "100%",
        maxWidth: "242px",
        boxShadow: 3 
      }}
    >
      <Stack spacing={2} direction={"row"}>
        <img src="" alt="bandera" />
        <Typography variant="h3" fontWeight={"bold"}>
          {data.countryName}
        </Typography>
      </Stack>
      <Stack spacing={1} direction={"row"}>


      <Typography variant="body1" fontSize={12}>
        {data.variable}:
      </Typography>
      </Stack>

      <Typography variant="body1" fontSize={14}>
        {data.data}
      </Typography>
      <Typography variant="body1" fontSize={14}>
        {data.update}
      </Typography>
    </Box>
  );
}
