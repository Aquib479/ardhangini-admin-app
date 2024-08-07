import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { FabricDetailsApiApi, FabricDetailsEntity } from "../services/openapi";

const useFabrics = () => {
  const api: FabricDetailsApiApi = new FabricDetailsApiApi(config);
  const [productFabrics, setProductFabrics] = useState<FabricDetailsEntity[]>(
    []
  );
  const getAllProductFabrics = useMemo(() =>  () => {
    api
      .fabricControllerFindAll()
      .then((resp) => {
        if (resp) {
          setProductFabrics(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[api]);

  return { productFabrics, getAllProductFabrics };
};

export default useFabrics;
