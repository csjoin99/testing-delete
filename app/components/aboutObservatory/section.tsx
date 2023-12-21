import { Box, Container, Grid, Stack, Typography } from "@mui/material";

interface Props {
    title: string;
    body: string;
    srcImg: string;
    icon: string;
    textRight: boolean | true;
}

export default function BannerSection({
    title,
    body,
    srcImg,
    icon,
    textRight,
}: Props) {
    console.log("IMG", srcImg)
    return (
        <Container sx={{ position: "relative" }} style={{padding: "166px 107px"}}>
            <Grid container spacing={4} alignItems={"center"} flexDirection={textRight ? "unset" : "row-reverse"}>
                <Grid item xs={6} textAlign={"center"}>
                    <img src={srcImg} alt="" />
                </Grid>

                <Grid item xs={6}>
                    <Box padding={4} sx={{backgroundColor: "#FFFFFF"}}>
                        <img src={icon} alt="" />
                        <Typography
                            variant="h2"
                            component={"h2"}
                            fontSize={"20px"}
                            fontWeight={"bold"}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            component={"p"}
                            fontSize={"16px"}
                        >
                            {body}
                        </Typography>
                    </Box>
                </Grid>
                

            </Grid>
        </Container>
    );
}
