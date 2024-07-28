import { createContext } from "react";
import { CategoryApi, CategoryEntity, Configuration, CreateCategoryDto } from "../../services/openapi";
import { ColDef } from "ag-grid-community";

export interface CategoryContext {
  showModal: boolean;
  title: string;
  handleNewClick: (data: CreateCategoryDto) => void;
  handleEditClick: (id: string, data: CreateCategoryDto) => void;
  selectedData: CategoryEntity | null;
  handleCloseModal: () => void;
}

export const context = createContext<CategoryContext | null>(null);

// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  { field: "id", hide: true },
  { field: "name", checkboxSelection: true },
  { field: "description" },
  { field: "isActive" },
];

export const defaultColDef = {
  flex: 1,
};

const config: Configuration = new Configuration();
config.basePath = "http://localhost:3001";
export const categoryApi: CategoryApi = new CategoryApi(config);

export const getAllCategories = async () => {
  try {
    return (await categoryApi.categoryControllerFindAll()).data;
  } catch (ex) {
    console.error(`could not fetch categories ${ex}`);
  }
 
}

