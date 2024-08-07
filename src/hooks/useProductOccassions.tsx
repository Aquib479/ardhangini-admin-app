import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  ProductOccassionApi,
  ProductOccassionEntity,
} from "../services/openapi";

const useProductOccassions = () => {
  const api: ProductOccassionApi = new ProductOccassionApi(config);
  const [productOccassions, setProductOccassions] = useState<
    ProductOccassionEntity[]
  >([]);
  const getAllProductOccassions = useMemo(
    () => () => {
      api
        .productOccassionControllerGetAll()
        .then((resp) => {
          if (resp) {
            setProductOccassions(resp?.data);
          }
        })
        .catch((e) => {
          console.log(e);
          showToast("Could not reach out to backend.");
        });
    },
    [api]
  );

  return { productOccassions, getAllProductOccassions };
};

export default useProductOccassions;
