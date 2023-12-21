"use client"
import { Typography, Box, Stack, Select, MenuItem, Grid, ListItem, ListItemText, List } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from "next/navigation";
import Flag from "../assets/images/argentina.png"
import CountryInfo from "../components/countries/countryInfo";
import VariablesClasification from "../components/countries/variablesClasification";
import VariablesComponent from "../components/countries/variables";
import { useState } from "react";

export default function Paises() {
    const [section, setSection] = useState<number>(1)

    const router = useRouter()
    return (
        <Box sx={{ margin: "24px" }}>
            <Stack alignItems={"center"}
                spacing={2}
                direction={"row"}
                flexBasis={"137px"}
                sx={{ cursor: "pointer" }}
                onClick={() => router.back()}
                marginBottom={"24px"}
            >
                <ChevronLeftIcon sx={{ color: "#75788B" }} />
                <Typography whiteSpace={"nowrap"} variant="h1" component={"h1"} fontSize={"16px"} color={"#75788B"}>Regresar</Typography>
            </Stack>

            <Box marginBottom={"24px"}>
                <Typography variant="h1" component="h1" fontWeight={"bold"} marginBottom={"24px"}>Regiones/Países</Typography>
                <Select fullWidth sx={{ backgroundColor: "#FFFFFF" }}>
                    <MenuItem value="argentina" sx={{ backgroundColor: "#FFFFFF" }}>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <img src={Flag.src} alt="" />
                            <Typography whiteSpace={"nowrap"} variant="h1" component={"h1"} fontSize={"14px"} fontWeight={"bold"}>Argentina</Typography>
                        </Stack>
                    </MenuItem>
                </Select>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box>
                        <Box
                            padding={"16px"}
                            onClick={() => setSection(1)}
                            sx={{
                                borderRadius: "4px",
                                border: "1px solid #E9ECEF",
                                backgroundColor: "#FFF",
                                marginBottom: "8px",
                                boxShadow: `${section === 1 ? 3 : "none"}`
                            }}>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}>
                                    <LanguageIcon sx={{ color: "#FFCD2D" }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography
                                        whiteSpace={"nowrap"}
                                        variant="h1"
                                        component={"h1"}
                                        fontSize={"14px"}
                                        fontWeight={"bold"}
                                    >
                                        Argentina
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    <List sx={{ listStyleType: 'disc', pl: 2, color: "#75788B", fontSize: "14px" }}>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            Descripcion
                                        </ListItem>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            Web
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            padding={"16px"}
                            onClick={() => setSection(2)}
                            sx={{
                                borderRadius: "4px",
                                border: "1px solid #E9ECEF",
                                backgroundColor: "#FFF",
                                marginBottom: "8px",
                                boxShadow: `${section === 2 ? 3 : "none"}`
                            }}>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M17 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H7V0H9V2H15V0H17V2ZM17 4V6H15V4H9V6H7V4H5V20H19V4H17ZM7 8H17V10H7V8ZM7 12H17V14H7V12Z" fill="#00A0FA" />
                                    </svg>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography
                                        whiteSpace={"nowrap"}
                                        variant="h1"
                                        component={"h1"}
                                        fontSize={"14px"}
                                        fontWeight={"bold"}
                                    >
                                        Descripción de variables
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    <List sx={{ listStyleType: 'disc', pl: 2, color: "#75788B", fontSize: "14px" }}>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            Marco legal
                                        </ListItem>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            Datos cuantitativos
                                        </ListItem>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            Índice de Riesgos de trabajo infantil
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            padding={"16px"}
                            onClick={() => setSection(3)}
                            sx={{
                                borderRadius: "4px",
                                border: "1px solid #E9ECEF",
                                backgroundColor: "#FFF",
                                marginBottom: "8px",
                                boxShadow: `${section === 3 ? 3 : "none"}`
                            }}>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}>
                                    <ShowChartIcon sx={{ color: "#88D35A" }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography
                                        whiteSpace={"nowrap"}
                                        variant="h1"
                                        component={"h1"}
                                        fontSize={"14px"}
                                        fontWeight={"bold"}
                                    >
                                        Variables
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container alignItems={"center"}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    <List sx={{ listStyleType: 'disc', pl: 2, color: "#75788B", fontSize: "14px" }}>
                                        <ListItem sx={{ display: 'list-item', padding: "0px", mb: 1 }}>
                                            19 variables (Fuente, año y web)
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>


                    </Box>
                </Grid>
                <Grid item xs={8}>
                    {section === 1 ? <CountryInfo icon={LanguageIcon} />
                        : section === 2 ? <VariablesClasification
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H7V0H9V2H15V0H17V2ZM17 4V6H15V4H9V6H7V4H5V20H19V4H17ZM7 8H17V10H7V8ZM7 12H17V14H7V12Z" fill="#00A0FA" />
                            </svg>} />
                            : <VariablesComponent icon={ShowChartIcon} />}
                </Grid>
            </Grid>
        </Box >
    )
}