"use client";

import React, { useEffect, useMemo } from "react";
import CoreReducer from "./reducer";
import { axiosIntance } from "@/app/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Country, BreadcrumbItem, Tag } from "../types/countries";

export type State = { filters?: any | null, activeFilters?: any | null, countries: Country[], breadcrumb: BreadcrumbItem[], tag: Tag[]};



type Props = {
  children: JSX.Element;
  complementaryState: any;
};
const initialState: State = {
  filters: null,
  activeFilters: null,
  countries: [],
  breadcrumb: [],
  tag: []
};

const CoreContext = React.createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => {},
]);

export const CoreProvider: React.FC<Props> = ({
  complementaryState,
  ...props
}) => {
  const [state, dispatch] = React.useReducer(CoreReducer, {
    ...initialState,
    ...complementaryState,
  });
  const value: [State, React.Dispatch<any>] = [state, dispatch];

  return <CoreContext.Provider value={value} {...props} />;
};

export const useCore = () => {
  const context = React.useContext(CoreContext);
  if (!context) {
    throw new Error("useContext debe estar dentro del proveedor CoreContext");
  }

  return context;
};

export const setFilters = (
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>,
  data: any
) => {
  dispatch({ type: "SET_FILTERS", payload: data });
};

export const setActiveFilters = (
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>,
  data: any
) => {
  dispatch({ type: "SET_ACTIVE_FILTERS", payload: data });
};

export const resetActiveFilters = (
  dispatch: React.Dispatch<{
    type: string;
  }>,
) => {
  dispatch({ type: "RESET_ACTIVE_FILTERS" });
};

export const setCountries = (
  dispatch: React.Dispatch<{
    type: "SET_COUNTRIES";
    payload: Country[];
  }>,
  data: Country[]
) => {
  dispatch({ type: "SET_COUNTRIES", payload: data });
};

export const setBreadcrumb = (
  dispatch: React.Dispatch<{
    type: "SET_BREADCRUMB";
    payload: BreadcrumbItem;
  }>,
  data: BreadcrumbItem
) => {
  dispatch({ type: "SET_BREADCRUMB", payload: data });
};

export const setBreadcrumbPo1 = (
  dispatch: React.Dispatch<{
    type: "SET_BREADCRUMB_PO1";
    payload: BreadcrumbItem;
  }>,
  data: BreadcrumbItem
) => {
  dispatch({ type: "SET_BREADCRUMB_PO1", payload: data });
};

export const setBreadcrumbPo2 = (
  dispatch: React.Dispatch<{
    type: "SET_BREADCRUMB_PO2";
    payload: BreadcrumbItem;
  }>,
  data: BreadcrumbItem
) => {
  dispatch({ type: "SET_BREADCRUMB_PO2", payload: data });
};
export const setBreadcrumbPo3 = (
  dispatch: React.Dispatch<{
    type: "SET_BREADCRUMB_PO3";
    payload: BreadcrumbItem;
  }>,
  data: BreadcrumbItem
) => {
  dispatch({ type: "SET_BREADCRUMB_PO3", payload: data });
};

export const setTag = (
  dispatch: React.Dispatch<{
    type: "SET_TAG";
    payload: Tag;
  }>,
  data: Tag
) => {
  dispatch({ type: "SET_TAG", payload: data });
};

export const resetTag = (
  dispatch: React.Dispatch<{
    type: "RESET_TAG";
  }>,
) => {
  dispatch({ type: "RESET_TAG" });
};
