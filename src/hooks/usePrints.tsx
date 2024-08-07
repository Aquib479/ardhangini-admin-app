import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { ProductPrintsApi, ProductPrintsEntity } from "../services/openapi";

const usePrints = () => {
  const api: ProductPrintsApi = new ProductPrintsApi(config);
  const [productPrints, setProductPrints] = useState<ProductPrintsEntity[]>([]);
  const getAllProductPrints = useMemo(() =>  () => {
    api
      .productPrintsControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductPrints(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[api]);

  return { productPrints, getAllProductPrints };
};

export default usePrints;
