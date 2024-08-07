import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductColorApi, ProductColorEntity } from "../services/openapi";

const useColors = () => {
  const api: ProductColorApi = new ProductColorApi(config);
  const [productColors, setProductColors] = useState<ProductColorEntity[]>([]);
  const getAllProductColors = useMemo(() => () => {
    api
      .productColorControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductColors(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [api]);

  return { productColors, getAllProductColors };
};

export default useColors;
