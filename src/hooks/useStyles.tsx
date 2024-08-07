import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductStyleApi, ProductStyleEntity } from "../services/openapi";

const useStyles = () => {
  const api: ProductStyleApi = new ProductStyleApi(config);
  const [productStyles, setProductStyles] = useState<ProductStyleEntity[]>([]);
  const getAllProductStyles = useMemo(() =>  () => {
    api
      .productStyleControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductStyles(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[api]);

  return { productStyles, getAllProductStyles };
};

export default useStyles;
