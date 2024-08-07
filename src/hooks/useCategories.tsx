import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { CategoryApi, CategoryEntity } from "../services/openapi";

const useCategories = () => {
  const api: CategoryApi = new CategoryApi(config);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const getAllCategories = useMemo(() => () => {
    return api
      .categoryControllerFindAll()
      .then((resp) => {
        if (resp) {
          setCategories(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [api]);

  return { categories, getAllCategories };
};

export default useCategories;
