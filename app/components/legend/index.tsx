"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Checkbox from "../../assets/images/icons/check-box.svg";
import CheckboxSelected from "../../assets/images/icons/selected.svg";
import Graphic from "../../assets/images/graphic.png";
import Argentina from "../../assets/images/argentina.png";
import CountryBox from "./components/countryBox";
import { useCore } from "@/app/core";
import { useEffect } from "react";
import { Country } from "@/app/types/countries";
import { PieChart } from "@mui/x-charts/PieChart";
import { KeyOff } from "@mui/icons-material";

export default function Legend() {
  const [{ countries }] = useCore();

  const handleDataValue = () => {
    const resArr: string[] = [];
    const countryValues: any = {};
    countries.forEach((item) => {
      var i = resArr.findIndex((x) => x == item.data);
      if (item.data && i <= -1) {
        resArr.push(item.data);
      }
    });

    resArr.forEach((item) => {
      countryValues[item as keyof typeof countryValues] = [];
      countries.forEach((country) => {
        if (country.data === item) {
          countryValues[item].push(country);
        }
      });
    });

    console.log(
      "Map de countryValues",
      Object.keys(countryValues).map((key) => ({
        value: countryValues[key].length,
        label: countryValues[key],
      }))
    );
    return Object.keys(countryValues).map((key) => ({
      value: countryValues[key].length,
      label: countryValues[key],
    }));
  };

  return countries.length > 0 ? (
    <Box>
      <Box
        padding={"16px"}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          background: "#fff",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="body1"
          component={"p"}
          fontSize={"16px"}
          fontWeight={"bold"}
        >
          Leyenda
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <img src={CheckboxSelected.src} alt="" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component={"p"} fontSize={"14px"}>
                  Sí
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <img src={Checkbox.src} alt="" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component={"p"} fontSize={"14px"}>
                  No
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Typography
        paddingBottom={"8px"}
        variant="h1"
        component={"h1"}
        fontSize={"24px"}
        fontWeight={"bold"}
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          marginBottom: "24px",
        }}
      >
        Total países
      </Typography>

      <Box
        padding={"16px"}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          background: "#fff",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography
                textAlign={"center"}
                variant="h1"
                component={"h1"}
                fontSize={"32px"}
                fontWeight={"bold"}
              >
                {countries.length === 1
                  ? `${countries.length} país`
                  : `${countries.length} países`}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1" component={"p"} fontSize={"20px"}>
                {countries[0].variable}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box marginTop={"40px"} padding={"24px"}>
          <Grid container spacing={0} alignItems={"center"}>
            <Grid item xs={3}>
              <Grid container spacing={5} marginBottom={4}>
                <Grid item xs={1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#00A0FA" />
                  </svg>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" component={"p"} fontSize={"14px"}>
                    Sí
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#F96908" />
                  </svg>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" component={"p"} fontSize={"14px"}>
                    No
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 1, label: "country" },
                      { id: 1, value: 10, label: "country 2" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Grid>
          </Grid>

          <Stack
            marginTop={"32px"}
            direction={"row"}
            spacing={2}
            useFlexGap
            flexWrap="wrap"
          >
            {countries &&
              countries.map((country: Country) => {
                return (
                  <CountryBox
                    key={country._id}
                    name={country.name}
                    flag={country?.flag || ""}
                    borderColor="#00A0FA"
                  />
                );
              })}
          </Stack>
        </Box>
      </Box>
    </Box>
  ) : null;
}
