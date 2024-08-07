import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import {
  CreatePromoDto,
  PromoDetailsApi,
  PromoDetailsEntity,
} from "../services/openapi";

const usePromoDetails = () => {
  const api: PromoDetailsApi = new PromoDetailsApi(config);
  const [productPromos, setProductPromos] = useState<PromoDetailsEntity[]>([]);
  const getAllPromoDetails = useMemo(() => () => {
    api
      .promoDetailsControllerGetAll()
      .then((resp) => {
        if (resp) {
          setProductPromos(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[api]);

  const editPromoDetails = (payLoad: CreatePromoDto) => {
    api
      .promoDetailsControllerCreateOrupdate(payLoad)
      .then(() => {
        getAllPromoDetails();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const removePromoDetails = (promoId: string) => {
    api
      .promoDetailsControllerRemove(promoId)
      .then(() => {
        getAllPromoDetails();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  return {
    productPromos,
    getAllPromoDetails,
    editPromoDetails,
    removePromoDetails,
  };
};

export default usePromoDetails;
