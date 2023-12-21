import { Stack, Typography } from "@mui/material";

interface Props {
    name: string
    flag: string
    borderColor: string
}

export default function CountryBox({ name, flag, borderColor }: Props) {
    return (
        <Stack spacing={2} direction={"row"} flexBasis={"137px"} padding={"16px"} sx={{ border: `1px solid ${borderColor}`, borderRadius: "8px" }}>
            <img src={flag} alt="" />
            <Typography whiteSpace={"nowrap"} variant="body1" component={"p"} fontSize={"14px"}>{name}</Typography>
        </Stack>
    )
}