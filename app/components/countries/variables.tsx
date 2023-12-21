import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useState } from "react";

interface Props {
    icon: any
}

export default function VariablesComponent({ icon: Icon }: Props) {
    const [accordionExpanded, setAccordionExpanded] = useState<number | null>(null)
    return (
        <Box padding={"16px"} sx={{
            borderRadius: "4px",
            border: "1px solid #E9ECEF",
            backgroundColor: "#FFF",
            marginBottom: "8px"
        }}>
            <Stack spacing={2} direction={"row"} alignItems={"center"} marginBottom={"24px"}>
                <Icon sx={{ color: "#FFCD2D" }} />
                <Typography variant="h1" component={"h1"} fontSize={"16px"} fontWeight={"bold"}>Variables</Typography>
            </Stack>

            <Box padding={"16px"} sx={{ marginBottom: "24px" }}>
                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}
                
                onChange={(e) => console.log("Event", e)}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 1 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 1 ? null : 1)}
                    >
                        <Typography variant="body1" component="p">Edad mínima permitida para trabajar</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{backgroundColor: "rgb(0, 0, 0, 0.06)", color: "black", fontWeight: "bold"}}>
                                    <TableRow>
                                        <TableCell>Fuente</TableCell>
                                        <TableCell>Artículos</TableCell>
                                        <TableCell>Año</TableCell>
                                        <TableCell>Web</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Prohibición del trabajo infantil y protección del trabajo adolescente (Ley 26.390)</TableCell>
                                        <TableCell>...</TableCell>
                                        <TableCell>2008</TableCell>
                                        <TableCell><a href="https://www.ilo.org/dyn/travail/docs/983/LEY%2026.390.pdf">https://www.ilo.org/dyn/travail/docs/983/LEY%2026.390.pdf</a></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 2 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 2 ? null : 2)}                    >
                        <Typography>Inclusiñon de trabajos peligrosos en la normativa</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body1" component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 3 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 3 ? null : 3)}                    >
                        <Typography variant="body1" component="p">Jornada máxima para el trabajo adolescente permitido</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 4 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 4 ? null : 4)}                    >
                        <Typography variant="body1" component="p">Regulación para el trabajo infantil doméstico</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 5 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 5 ? null : 5)}                    >
                        <Typography variant="body1" component="p">Sanción por incumplimiento a las disposiciones de trabajo infantil</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 6 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 6 ? null : 6)}                    >
                        <Typography variant="body1" component="p">Jornada máxima para el trabajo adolescente permitido</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>


            </Box>
        </Box>
    )
}