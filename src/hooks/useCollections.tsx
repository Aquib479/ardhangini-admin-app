import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  ProductCollectionApi,
  ProductCollectionEntity,
} from "../services/openapi";

const useCollections = () => {
  const api: ProductCollectionApi = new ProductCollectionApi(config);
  const [collections, setCollections] = useState<ProductCollectionEntity[]>([]);
  const getAllCollections = useMemo(() => () => {
    api
      .productColelctionControllerGetAll()
      .then((resp) => {
        if (resp) {
          setCollections(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  }, [api]);

  return { collections, getAllCollections };
};

export default useCollections;
