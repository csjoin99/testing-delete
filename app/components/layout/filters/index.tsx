"use client";
import { useEffect, useRef, useState } from "react";
import { resetActiveFilters, resetTag, setBreadcrumbPo1, setBreadcrumbPo2, setBreadcrumbPo3, setTag, useCore } from "@/app/core";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";
import CustomInput from "../../shared/customInput";
import VariablesInput from "../../observatory/variablesInputs";

export default function MainFilters() {
  const searchOptionsContainerRef = useRef<HTMLElement | null>(null);
  const [{ filters, tag }, dispatch] = useCore();
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [selecteThemeFilter, setSelecteThemeFilter] = useState<number | null>(
    null
  );
  const [selectedVariableFilter, setSelectedVariableFilter] = useState<
    number | null
  >(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [openSearchOptions, setOpenSearchOptions] = useState<boolean>(false);
  const [searchOptions, setSearchOptions] = useState<any[]>([]);
  const [loadingVariable, setLoadingVariable] = useState<number | null>(null);

  const handleOpenOptions = () => {
    setOpenSearchOptions(true);
  };

  const handleCloseOptions = () => {
    setOpenSearchOptions(false);
  };

  useEffect(() => {
    let allVariables: any = [];
    if (filters) {
      filters.forEach((filter: any, filterIndex: number) =>
        filter.themes.forEach((theme: any, themeIndex: number) => {
          allVariables = [...allVariables, ...theme.variables.map((e: any, variableIndex: number) => ({ ...e, filterIndex, themeIndex, variableIndex }))];
        })
      );

      console.log("All variables", filters)
      setSearchOptions(
        allVariables.filter((e: any) => e.name.toLowerCase().includes(searchValue?.toLowerCase()))
      );

      if (searchValue && searchValue?.length >= 3) handleOpenOptions()

      if (searchValue?.length === 0) handleCloseOptions()

    }
  }, [searchValue]);

  return (
    <Box
      sx={(theme) => {
        return {
          width: "100%",
          marginTop: "40px",
        };
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <Typography variant="h1" component="h1" mb={3}>
          Filtros
        </Typography>
        <Box ref={searchOptionsContainerRef}>
          <CustomInput
            type="text"
            placeholder="Buscar variable"
            value={searchValue || ""}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setSearchValue(e.target.value)}
            icon="search"
          />
          <Menu
            open={openSearchOptions}
            anchorEl={searchOptionsContainerRef.current}
            onClose={handleCloseOptions}
            onClick={handleCloseOptions}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            autoFocus={false}
            sx={{ whiteSpace: "wrap", width: 300, height: 350 }}
          >
            {searchOptions.length > 0 ? searchOptions.map((e) => (
              <MenuList key={e._id}>
                <MenuItem onClick={() => {
                  setSelectedFilter(e.filterIndex + 1)
                  setSelecteThemeFilter(e.themeIndex + 1)
                  setSelectedVariableFilter(e.variableIndex + 1)
                }}><Typography fontSize={14}>{e.name}</Typography></MenuItem>
              </MenuList>
            ))
              : <MenuList>
                <MenuItem disabled={true}><Typography fontSize={14}>No hay resultados</Typography></MenuItem>
              </MenuList>}
          </Menu>
        </Box>

        <Box>
          <Stack direction="column" spacing={3}>
            {filters.map((filter: any, index: number) => {
              return (
                <Box key={filter._id}>
                  <Stack
                    direction="row"
                    alignItems={"start"}
                    spacing={2}
                    onClick={() => {
                      setSelectedFilter((prevValue) =>
                        prevValue === index + 1 ? null : index + 1
                      );
                      setSelecteThemeFilter(null);
                      setSelectedVariableFilter(null);
                      if (tag.length > 0) {
                        resetTag(dispatch)
                        resetActiveFilters(dispatch)
                      }

                      setBreadcrumbPo1(dispatch, { name: filter.name })
                    }}
                  >
                    <Stack
                      sx={{ backgroundColor: "#88D35A" }}
                      direction="row"
                      alignItems={"center"}
                    >
                      {selectedFilter === index + 1 ? (
                        <Remove sx={{ color: "#fff" }} />
                      ) : (
                        <AddIcon sx={{ color: "#fff" }} />
                      )}
                    </Stack>
                    <Typography variant="h3">{filter.name}</Typography>
                  </Stack>
                  {selectedFilter === index + 1 && (
                    <Stack
                      direction="column"
                      spacing={2}
                      sx={(theme) => ({
                        marginTop: theme.spacing(2),
                        marginLeft: "2.5rem",
                      })}
                    >
                      {filter.themes.map((theme: any, themeIndex: number) => (
                        <Box key={filter._id}>
                          <Stack
                            direction="row"
                            alignItems={"flex-start"}
                            spacing={2}
                            onClick={() => {
                              setSelecteThemeFilter((prevValue) =>
                                prevValue === themeIndex + 1
                                  ? null
                                  : themeIndex + 1
                              );

                              setBreadcrumbPo2(dispatch, { name: theme.name, index: themeIndex })
                              setSelectedVariableFilter(null)
                              if (tag.length > 0) {
                                resetTag(dispatch)
                                resetActiveFilters(dispatch)
                              }
                            }}
                          >
                            <Stack
                              sx={{ backgroundColor: "#88D35A" }}
                              direction="row"
                              alignItems={"center"}
                            >
                              {selecteThemeFilter === themeIndex + 1 ? (
                                <Remove sx={{ color: "#fff" }} />
                              ) : (
                                <AddIcon sx={{ color: "#fff" }} />
                              )}
                            </Stack>
                            <Typography variant="h4">{theme.name}</Typography>
                          </Stack>
                          {selecteThemeFilter === themeIndex + 1 && (
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={2}
                              sx={(theme) => ({
                                marginTop: theme.spacing(2),
                                marginLeft: "2.5rem",
                              })}
                            >
                              {theme.variables.map(
                                (variable: any, variableIndex: number) => (
                                  <Box key={filter._id}>
                                    <Stack
                                      direction="row"
                                      alignItems={"flex-start"}
                                      spacing={2}
                                      onClick={() => {
                                        if (tag.length > 0) {
                                          resetTag(dispatch)
                                          resetActiveFilters(dispatch)
                                        }
                                        setSelectedVariableFilter((prevValue) =>
                                          prevValue === variableIndex + 1
                                            ? null
                                            : variableIndex + 1
                                        )
                                        setBreadcrumbPo3(dispatch, { name: variable.name, index: variableIndex })
                                        console.log("VARIABLE", variable)
                                      }
                                      }
                                    >
                                      <Stack
                                        sx={{
                                          backgroundColor: "#88D35A",
                                        }}
                                        direction="row"
                                        alignItems={"center"}
                                      >
                                        {selectedVariableFilter ===
                                          variableIndex + 1 ? (
                                          <Remove sx={{ color: "#fff" }} />
                                        ) : (
                                          <AddIcon sx={{ color: "#fff" }} />
                                        )}
                                      </Stack>
                                      <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
                                        <Typography variant="h4">
                                          {variable.name}
                                        </Typography>
                                        {loadingVariable === variableIndex + 1 && <Box>
                                          <CircularProgress size={"16px"} style={{ color: "#88D35A" }} />
                                        </Box>}
                                      </Stack>
                                    </Stack>
                                    {selectedVariableFilter ===
                                      variableIndex + 1 && (
                                        <VariablesInput variableData={variable} loadingVariable={(e: number | null) => setLoadingVariable(e)} variableIndex={variableIndex + 1} />
                                      )}
                                  </Box>
                                )
                              )}
                            </Stack>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  )
                  }
                </Box>
              );
            })}
            <Stack direction="row">
              <Box></Box>
            </Stack>
          </Stack>
        </Box>
      </Box >
    </Box >
  );
}
