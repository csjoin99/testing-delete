import { Box, Container, Grid, Typography } from "@mui/material";
import BannerAbout from "../components/aboutObservatory/banner";
import BannerSection from "../components/aboutObservatory/section";
import TestAboutImage from "../assets/images/testAbout1.png"
import TestAboutIcon from "../assets/images/testAboutIcon1.svg"
import Line1 from "../assets/images/line1.svg"
import Plane from "../assets/images/plane.png"
import Plane2 from "../assets/images/plane2.png"

export default async function AcercaDelObservatorio({ params }: any) {
  const textTest = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fugiat accusantium perspiciatis. Expedita ea magnam laboriosam blanditiisrerum dolores exercitationem ducimus, voluptate, aliquid dolorematque rem autem eum iste labore!"
  return (
    <Container sx={{ position: "relative" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              marginBottom: "24px",
            }}
          >
            <BannerAbout />
            <svg xmlns="http://www.w3.org/2000/svg" width="731" height="414" viewBox="0 0 731 414" fill="none"
              style={{
                position: "absolute",
                right: "250px",
                top: "550px",
                zIndex: "9999"
              }}>
              <path d="M726.504 5.00007C518.503 204 107.502 -36.5 26.0015 74.4992C-103.253 250.537 376.75 409.795 376.75 409.795" stroke="#FFCD2D" stroke-width="6" stroke-linecap="square" stroke-linejoin="round" stroke-dasharray="16 16" />
            </svg>

            <Box position={"relative"}>
              <img src={Plane.src} style={{
                position: "absolute",
                left: "250px",
                top: "100px"
              }} />
              <img src={Plane2.src} style={{
                position: "absolute",
                right: "250px",
                bottom: "150px"
              }} />
              <BannerSection
                title="Titulo"
                body={textTest}
                srcImg={TestAboutImage.src}
                icon={TestAboutIcon.src}
                textRight={true}
              />
            </Box>

            <img src={Line1.src} width="50%" height="50%"
              style={{
                position: "absolute",
                right: "300px",
                top: "470px",
                zIndex: "-9999"
              }}>
            </img>
            <Box position={"relative"}>
            <img src={Plane2.src} style={{
                position: "absolute",
                left: "350px",
                top: "0px"
              }} />
              <BannerSection
                title="Titulo"
                body={textTest}
                srcImg={TestAboutImage.src}
                icon={TestAboutIcon.src}
                textRight={false}
              />
            </Box>

            <svg xmlns="http://www.w3.org/2000/svg" width="456" height="486" viewBox="0 0 456 486" fill="none"
            style={{
              position: "absolute",
              right: "500px",
              top: "1730px",
              zIndex: "9999"
            }}>
              <path d="M310.502 4.50024C551 99.4997 440.505 287.5 310.502 305C-211.252 375.235 89.0019 481.5 89.0019 481.5" stroke="#FFCD2D" stroke-width="6" stroke-linecap="square" stroke-linejoin="round" stroke-dasharray="16 16" />
            </svg>

            <Box position={"relative"}>
              <BannerSection
                title="Titulo"
                body={textTest}
                srcImg={TestAboutImage.src}
                icon={TestAboutIcon.src}
                textRight={true}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}
