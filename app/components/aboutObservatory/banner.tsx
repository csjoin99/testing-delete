import { Box, Container, Stack, Typography } from "@mui/material";
import BannerAboutImage from "../../assets/images/bannerAboutImage.png";
import Image from "next/image";

export default function BannerAbout() {
  return (
    <Container sx={{ position: "relative" }} style={{paddingBottom: "103px", paddingLeft: "107px", paddingRight: "107px"}}>
      <Typography
        variant="h1"
        component="h1"
        fontSize="40px"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          marginBottom: "24px",
          marginTop: "48px",
        }}
      >
        Acerca del <span style={{ color: "#88D35A" }}>Observatorio</span>
      </Typography>

      <Stack direction={"column"} alignContent={"center"}>
        <Box textAlign={"center"}>
          <Image src={BannerAboutImage} alt="about" style={{ width: "100%" }} />
        </Box>

        <Box marginTop={"32px"} padding={"16px"} sx={{boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.1)", borderRadius: "16px"}}>
          <Typography
            variant="h2"
            component="p"
            fontWeight={"bold"}
            fontSize={"24px"}
            marginBottom={"16px"}
          >
            Bienvenido y Bienvenida
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fugiat
            accusantium perspiciatis. Expedita ea magnam laboriosam blanditiis
            rerum dolores exercitationem ducimus, voluptate, aliquid dolorem
            atque rem autem eum iste labore!
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
