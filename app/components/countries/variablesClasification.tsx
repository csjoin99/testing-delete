import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Stack, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useState } from "react";

interface Props {
    icon: any
}

export default function VariablesClasification({ icon: Icon }: Props) {
    const [accordionExpanded, setAccordionExpanded] = useState<number | null>(null)

    return (
        <Box padding={"16px"} sx={{
            borderRadius: "4px",
            border: "1px solid #E9ECEF",
            backgroundColor: "#FFF",
            marginBottom: "8px"
        }}>
            <Stack spacing={2} direction={"row"} alignItems={"center"} marginBottom={"24px"}>
                {Icon}
                <Typography variant="h1" component={"h1"} fontSize={"16px"} fontWeight={"bold"}>Clasificación de variables</Typography>
            </Stack>

            <Box padding={"16px"} sx={{ marginBottom: "24px" }}>
                <Accordion sx={{
                    mb: 4,
                    boxShadow: "none",
                    borderRadius: "4px",
                    border: "1px solid #E9ECEF",
                    backgroundColor: "#FFFFFF"
                }}>
                    <AccordionSummary
                        expandIcon={accordionExpanded === 1 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 1 ? null : 1)}
                    >
                        <Typography variant="body1" component="p">Marco legal</Typography>
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
                        expandIcon={accordionExpanded === 2 ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 2 ? null : 2)}
                    >
                        <Typography>Datos cuantitativos</Typography>
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
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => setAccordionExpanded(accordionExpanded === 3 ? null : 3)}
                    >
                        <Typography variant="body1" component="p">Índice de Riesgos de trabajo infantil</Typography>
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