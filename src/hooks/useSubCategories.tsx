import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { SubcategoryApi, SubcategoryEntity } from "../services/openapi";

const useSubCategories = () => {
  const api: SubcategoryApi = new SubcategoryApi(config);
  const [subcategories, setSubCategories] = useState<SubcategoryEntity[]>([]);
  const getAllSubCategories = useMemo(
    () => () => {
      api
        .subcategoryControllerFindAll()
        .then((resp) => {
          if (resp) {
            setSubCategories(resp?.data);
          }
        })
        .catch((e) => {
          console.log(e);
          showToast("Could not reach out to backend.");
        });
    },
    [api]
  );

  return { subcategories, getAllSubCategories };
};

export default useSubCategories;
