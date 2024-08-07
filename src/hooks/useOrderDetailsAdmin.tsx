import { useEffect, useMemo, useState } from "react";
import { config, showToast } from "../context/root.context";
import { OrderResponse } from "../services/openapi/api";
import { CreatePromoDto, OrderApiApi } from "../services/openapi";

const useOrderDetailsAdmin = () => {
  const api: OrderApiApi = new OrderApiApi(config);
  const [productOrders, setProductOrders] = useState<OrderResponse[]>([]);

  const getAllOrders = useMemo(() => () => {
    api
      .orderControllerFindAll()
      .then((resp) => {
        if (resp) {
          setProductOrders(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  },[api]);

  const getOrderesByUser = (userId: string) => {
    api
      .orderControllerFindAllByUserId(userId)
      .then((resp) => {
        if (resp) {
          setProductOrders(resp?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const completeCodOrder = (orderId: string) => {
    api
      .orderControllerCompleteCodOrder()
      .then(() => {
        getAllOrders();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  const rejectOrder = (orderId: string) => {
    api
      .orderControllerRejectOrder()
      .then(() => {
        getAllOrders();
      })
      .catch((e) => {
        console.log(e);
        showToast("Could not reach out to backend.");
      });
  };

  return {
    productOrders,
    getAllOrders,
    getOrderesByUser,
    completeCodOrder,
    rejectOrder,
  };
};

export default useOrderDetailsAdmin;
