"use client";
import React, { useEffect, useRef, useState } from "react";
import jsonMap from "./../../../assets/jsons/mapa_latina.json";
import { setCountries, useCore } from "@/app/core";
import { getFilteredData } from "@/app/client/filters";
import { Country, TooltipData } from "@/app/types/countries";
import { Box, Stack, Typography } from "@mui/material";
import Tooltip from "../tooltip";

export default function Map() {
  const tooltipRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<HTMLElement | null>(null);
  const [{ activeFilters, filters, countries, tag }, dispatch] = useCore();
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const form: any = { filters: [] };
      if (activeFilters.length) {
        activeFilters.forEach((e: any) => {
          form.filters.push({ variable: e.code, index: e.key, value: e.value });
        });
        const { data } = await getFilteredData("es", form);
        setCountries(dispatch, data.countries);
      }
      else {
        const map = document.getElementById(`map`);
        if (map) {
          Array.from(map?.children).forEach((g, index) => {
            if (index === 0) return
            Array.from(g.children).forEach(country => {
              (country as HTMLElement).style.fill = "white";
            });
          });
        }
      }
    }

    console.log("Filters", activeFilters);
    getData();
  }, [activeFilters]);

  // set mouse event for tooltip, always tracking the mouse
  useEffect(() => {
    const mouseMove = (mouse: MouseEvent) => {
      const tooltip = tooltipRef.current;
      const map = mapRef.current;
      const { pageX, pageY } = mouse;
      if (!tooltip || !map) {
        return;
      }
      const mapContainerPsition = map.getBoundingClientRect();
      let scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
      tooltip.style.top = `${pageY - mapContainerPsition.top + 400 - scrollTop
        }px`;
      tooltip.style.left = `${pageX - mapContainerPsition.left - 10}px`;
    };
    // for track the cursor
    document.addEventListener("mousemove", mouseMove);
    return () => {
      // remove cursdor event
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    countries.forEach((item: Country) => {
      const elemento = document.getElementById(`${item.node}`);
      const map = document.getElementById(`map`);
      if (map) {
        Array.from(map?.children).forEach((g, index) => {
          if (index === 0) return
          Array.from(g.children).forEach(country => {
            (country as HTMLElement).style.fill = "white";
          });
        });
      }
      setTimeout(() => {
        if (elemento) {
          Array.from(elemento.children).forEach((e) => {
            return ((e as HTMLElement).style.fill = "yellow");
          });
        }
      }, 1000)

    });
  }, [countries]);

  // hover handler
  const svgHoverHandler = (event: React.MouseEvent<SVGGElement>) => {
    const targetCountry = countries.find((e: Country) => {
      return e.node === event.currentTarget.id;
    });
    if (targetCountry) {
      setTooltipData({
        update: targetCountry.update,
        countryName: targetCountry.name,
        flag: targetCountry.flag,
        variable: targetCountry.variable,
        variableData: targetCountry.variableData,
      });
    }
  };
  // blur handler
  const svgblurHandler = (event: React.MouseEvent<SVGGElement>) => {
    setTooltipData(null);
  };

  return (
    <>
      {tooltipData && (
        <Box ref={tooltipRef} sx={{ position: "absolute" }}>
          <Tooltip data={tooltipData} />
        </Box>
      )}
      <Box ref={mapRef}>
        <svg
          id="map"
          className="FadeIn"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={jsonMap.viewBox}
        >
          {jsonMap.locations.map((country) => {
            if (country.id !== "cont_latina") return;
            return (
              <g id={country.id} key={country.id}>
                {country.paths.map((path: any, i: number) => {
                  return (
                    <path
                      id={path.id}
                      key={path.id + i}
                      stroke={"#c2c2c2"}
                      strokeWidth={2}
                      d={path.d}
                    />
                  );
                })}
              </g>
            );
          })}
          {jsonMap.locations.map((country) => {
            if (country.id === "cont_latina") return;
            return (
              <g
                id={country.id}
                key={country.id}
                onMouseLeave={svgblurHandler}
                onMouseEnter={svgHoverHandler}
              >
                {country.paths.map((path: any, i: number) => {
                  return (
                    <path
                      id={path.id}
                      key={path.id + i}
                      stroke={"#c2c2c2"}
                      fill="white"
                      strokeWidth={2}
                      d={path.d}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </Box>
    </>
  );
}
