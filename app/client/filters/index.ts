import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getFilters = (lang: string = "es"): Promise<AxiosResponse> => {
  return axiosIntance.get(`sidebar?lang=${lang}`);
};

export const getVariablesInputs = (lang: string = "es", variable: number) => {
  return axiosIntance.get(`sidebar/data?lang=${lang}&variable=${variable}`);
};

export const getVariablesOptions = (lang: string = "es", form:any) => {
  return axiosIntance.post(`sidebar/options?lang=${lang}`, form);
};

export const getFilteredData = (lang: string = "es", activeFilters: any) => {
  return axiosIntance.post(`sidebar/country?lang=${lang}`, activeFilters);
};



