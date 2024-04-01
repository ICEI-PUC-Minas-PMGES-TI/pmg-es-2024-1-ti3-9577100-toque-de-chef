import { useSearch, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export const useSearchParam = <T extends string | string[]>(
  paramName: string,
  defaultValue?: T
): [T | undefined, (update: T | undefined) => void] => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const updateParam = useCallback(
    (newValue: T | undefined) => {
      if (newValue === undefined) {
        navigate({
          search: (prev) => {
            // @ts-expect-error test
            delete prev[paramName];
            return prev;
          },
        });
      } else {
        navigate({
          search: (prev) => ({
            ...prev,
            [paramName]: newValue,
          }),
        });
      }
    },
    [navigate, paramName]
  );

  if (!(paramName in search) && defaultValue) {
    return [defaultValue, updateParam];
  }

  if (!(paramName in search)) {
    return [undefined, updateParam];
  }

  // @ts-expect-error test
  const value = search[paramName] as T; // as T: assumes the type we get back is same as type of data we put in

  return [value, updateParam];
};
