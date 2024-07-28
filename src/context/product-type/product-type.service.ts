import { createContext } from "react";
import {
  Configuration,
  CreateProductTypeDto,
  ProductTypeApi,
  ProductTypeEntity,
} from "../../services/openapi";
import { ColDef } from "ag-grid-community";
import { toast } from "react-toastify";

const entityName = 'ProductType';
export const CREATE_MODAL_TITLE = `Create ${entityName}`;

export const EDIT_MODAL_TITLE = `Edit ${entityName}`;

export interface ProductTypeContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateProductTypeDto) => void;
  handleEditClick: (id: string, data: CreateProductTypeDto) => void;
  selectedData: ProductTypeEntity | null;
  handleCloseModal: () => void;
  showSpinner: boolean;
}

export const productTypeContext = createContext<ProductTypeContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
];

export const defaultColDef = {
  flex: 1,
};

const config: Configuration = new Configuration();
config.basePath = "http://localhost:3001";
const productTypeApi: ProductTypeApi = new ProductTypeApi(config);

export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });

export const getAllProductTypes = async () => {
  try {
    return (await productTypeApi.productTypeControllerFindAll()).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const createProductType = async (payload: CreateProductTypeDto) => {
  try {
    return (await productTypeApi.productTypeControllerCreate(payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const updateProductType = async (id: string, payload: CreateProductTypeDto) => {
  try {
    return (await productTypeApi.productTypeControllerUpdate(id, payload)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};

export const deleteProductType = async (id: string) => {
  try {
    return (await productTypeApi.productTypeControllerRemove(id)).data;
  } catch (e) {
    showToast("Could not reach out to backend.");
  }
};
