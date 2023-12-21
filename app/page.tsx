import { Box, Container, Grid, Typography } from "@mui/material";
import { getFilters } from "./client/filters";
import { CoreProvider } from "./core";
import MainFilters from "./components/layout/filters";
import Map from "./components/observatory/map";
import Legend from "./components/legend";
import BreadcrumbComponent from "./components/observatory/breadcrumb";
import TagComponent from "./components/observatory/tag";

async function getData() {
  try {
    const { data } = await getFilters("es");
    return { filters: data.data };
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export default async function Home({ params }: any) {
  const data = await getData();
  return (
    <CoreProvider complementaryState={{ filters: data?.filters || null }}>
      <Container sx={{ position: "relative", paddingBottom: "200px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                marginBottom: "24px",
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  textAlign: "center",
                  marginBottom: "24px",
                  marginTop: "48px",
                  fontWeight: "bold",
                }}
              >
                Observatorio Regional contra el trabajo infantil en América
                Latina y el Caribe
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                El observatorio Regional contra el trabajo infantil en América
                Latina y el Caribe, impulsado por la iniciativa Regional América
                Latina y el Caribe Libre de Trabajo Infantil, es una plataforma
                de conocimiento que tiene como objetivo presentar evidencia
                robusta para la mejora
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
              <BreadcrumbComponent />
            <Box sx={{ marginTop: 4 }}>
              <TagComponent />
            </Box>
            <Map />
            <Legend />
          </Grid>
          <Grid item xs={4}>
            <MainFilters />
          </Grid>
        </Grid>
      </Container>
    </CoreProvider>
  );
}
