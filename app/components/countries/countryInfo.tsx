import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React from "react";

interface Props {
    icon: any
}
export default function CountryInfo({ icon: Icon }: Props) {
    return (
        <Box padding={"16px"} sx={{
            borderRadius: "4px",
            border: "1px solid #E9ECEF",
            backgroundColor: "#FFF",
            marginBottom: "8px"
        }}>
            <Stack spacing={2} direction={"row"} alignItems={"center"} marginBottom={"24px"}>
                <Icon sx={{ color: "#FFCD2D" }} />
                <Typography variant="h1" component={"h1"} fontSize={"16px"} fontWeight={"bold"}>Argentina</Typography>
            </Stack>

            <Box padding={"16px"} sx={{
                borderRadius: "4px",
                border: "1px solid #E9ECEF",
                backgroundColor: "#FFF",
                marginBottom: "24px"
            }}>
                <Typography fontSize={"16px"} marginBottom={"24px"}>Descripción</Typography>
                <Typography fontSize={"14px"}>
                    Lorem ipsum dolor sit amet consectetur. Semper enim ac egestas sed tristique id. Gravida elementum diam quis risus sem. Suscipit porttitor nec ut egestas lectus habitasse tincidunt. Risus aliquet faucibus euismod dignissim lacus vulputate nibh. Aliquam fames eget quam convallis sed ultrices dolor. Tristique massa eget blandit ac et metus sit at diam. Amet elit tellus at neque habitant. Proin est egestas cursus enim habitasse. Molestie in neque risus tellus varius. Pulvinar feugiat in odio imperdiet libero urna leo donec. Massa pharetra volutpat arcu mattis tortor purus vitae mauris egestas.
                </Typography>
            </Box>

            <Box padding={"16px"} sx={{
                borderRadius: "4px",
                border: "1px solid #E9ECEF",
                backgroundColor: "#FFF",
                marginBottom: "24px"
            }}>
                <Typography fontSize={"16px"} marginBottom={"24px"}>Web consultadas</Typography>
                <Typography fontSize={"14px"}>
                    <List sx={{ listStyleType: 'disc', pl: 2, fontSize: "14px" }}>
                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 3 }}>
                        Lorem ipsum dolor sit amet consectetur. Semper enim ac egestas sed tristique id.
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 3 }}>
                        Lorem ipsum dolor sit amet consectetur. Semper enim ac egestas sed tristique id.
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 3 }}>
                        Lorem ipsum dolor sit amet consectetur. Semper enim ac egestas sed tristique id.
                        </ListItem>
                    </List>
                </Typography>
            </Box>
        </Box>
    )
}