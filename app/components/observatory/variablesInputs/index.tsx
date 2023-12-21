"use client";
import { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { getVariablesInputs, getVariablesOptions } from "@/app/client/filters";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { resetTag, setActiveFilters, setTag, useCore } from "@/app/core";

interface Props {
  variableData: {
    code: number;
    text: string;
    options: string[];
  };
  loadingVariable: (e: number | null) => void
  variableIndex: number | null
}

interface InputData {
  code: number;
  text: string;
  options: string[];
  value: string;
  key: string | number;
}

interface FormValues {
  inputs: InputData[];
}

export default function VariablesInput({ variableData, loadingVariable, variableIndex }: Props) {
  const [ , dispatch] = useCore();
  const { control, setValue } = useForm<FormValues>();
  const { fields, replace } = useFieldArray<FormValues>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "inputs", // unique name for your Field Array
  });

  const values = useWatch({ control, name: "inputs" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<{ index: number, options: string[] }[]>([])



  useEffect(() => {
    const getData = async () => {
      if (values && values.length > 0) {
        const activeFields = values
          .filter((item) => item.value !== "" && item.value !== undefined)
          .map((e) => ({
            code: e.code,
            key: e.key,
            value: e.value,
          }));

        if (activeFields.length > 0) {

          try {
            const { data } = await getVariablesOptions("es", {
              variable: variableData.code,
              filters: [
                ...activeFields
                  .filter((e) => e.value !== "")
                  .map((field, index: number) => ({
                    index: field.key,
                    value: field.value,
                  }))
              ],
            });
            const { response } = data
            response.forEach((e: any) => {
              const newOptionList = [...optionList]
              const targetField = newOptionList.findIndex((option: { index: number, options: string[] }) => option.index === e.index)
              newOptionList[targetField] = { index: newOptionList[targetField].index, options: e.options }
              setOptionList([...newOptionList])
            })
            setActiveFilters(dispatch, activeFields);

          } catch (error) {
            console.log("error", error)
          }

        }

      }

    }
    getData()
  }, [values]);

  useEffect(() => {
    const getData = async () => {
      console.log("data")
      try {
        loadingVariable(variableIndex)
        const { data } = await getVariablesInputs("es", variableData.code);
        if (data.data.length > 0) {
          replace(
            data.data.map((e: any) => ({
              code: e.code,
              text: e.text,
              value: "",
              key: e.index,
            }))
          );
          setOptionList(data.data.map((e: any) => ({ index: e.index, options: e.options.map((option: string) => option) })))
        }

        else {
          setActiveFilters(dispatch, [{code: variableData.code }]);
        }
      }

      catch (error) { console.log("inputs error", error) }

      finally { loadingVariable(null) }
    };
    getData();
  }, []);

  useEffect(() => {
      console.log("use effect")
 
  }, []);

  const handleChange = async (inputIndex: number) => {
    fields.forEach((field, index: number) => {
      if (inputIndex < index) {
        setValue(`inputs.${index}.value`, "");
      }
    });

  };

  console.log("values", values)
  return (
    <Stack marginTop={2}>
      {fields.map((input, index) => {
        console.log("input", input)
        return (
          <>
            <Typography
              variant="body1"
              component="p"
              sx={(theme) => {
                return {
                  fontSize: "14px",
                };
              }}
            >
              {input.text}
            </Typography>
            <Controller
              control={control}
              name={`inputs.${index}.value`}
              render={({ field, fieldState }) => {
                return (
                  <Select
                    label=""
                    value={field.value}
                    onChange={(e: SelectChangeEvent) => {
                      handleChange(index);
                      field.onChange(e.target.value);
                    }}
                    disabled={(
                      index - 1 >= 0 && values
                        ? values[index - 1].value === "" ? true : false : false
                    )}
                    sx={(theme) => {
                      return {
                        marginTop: "5px",
                        marginBottom: "16px",
                      };
                    }}
                  >
                    <MenuItem key={``} value={``}>
                      Seleccione
                    </MenuItem>
                    {optionList.find(e => e.index === input.key)?.options.map((option: string) => (
                      <MenuItem
                        key={`${option}`}
                        value={`${option}`}
                        onClick={() => {
                          if (index === 0) {
                            resetTag(dispatch);
                          }
                          setTag(dispatch, {
                            input: input.text,
                            option: option,
                            index: index,
                          });
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
          </>
        );
      })
      }
    </Stack>
  );
}
