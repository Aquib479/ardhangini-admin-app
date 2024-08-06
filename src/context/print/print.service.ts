import { createContext } from "react";
import { ColDef } from "ag-grid-community";
import { config, showToast } from "../root.context";
import {
  CreateProductPrintDto,
  ProductPrintsApi,
  ProductPrintsEntity,
} from "../../services/openapi";

export const CREATE_MODAL_TITLE = "Create Print";

export const EDIT_MODAL_TITLE = "Edit Print";

export interface ProductPrintContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductPrintDto) => void;
  handleEditClick: (id: string, data: CreateProductPrintDto) => void;
  selectedData: ProductPrintsEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productPrintContext =
  createContext<ProductPrintContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];

const api: ProductPrintsApi = new ProductPrintsApi(config);

export const getAllPrints = async () => {
  try {
    return (await api.productPrintsControllerGetAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createPrint = async (payload: CreateProductPrintDto) => {
  try {
    return (await api.productPrintsControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updatePrints = async (
  id: string,
  payload: CreateProductPrintDto
) => {
  try {
    payload.id = id;
    return (await api.productPrintsControllerUpdate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deletePrints = async (id: string) => {
  try {
    return (await api.productPrintsControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
