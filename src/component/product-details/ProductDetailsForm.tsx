import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateProductDto,
  FabricDetailsEntity,
  ManufacturerEntity,
  SubcategoryEntity,
} from "../../services/openapi";
import {
  productDetailsContext,
  ProductDetailsContext,
} from "../../context/product-details/product-details.service";
import { getAllSubCategories, getSubCategoriesByCategory } from "../../context/sub-category/sub-category.service";
import { getAllManufacturers } from "../../context/manufacturer/manufacturer.service";
import { getAllFabrics } from "../../context/fabric/fabric.service";
import { rootContext, RootContext } from "../../context/root.context";

function ProductDetailsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductDto>();

  const context: ProductDetailsContext | null = useContext(
    productDetailsContext
  );
  const [subCategories, setSubCategories] = useState<SubcategoryEntity[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerEntity[]>([]);
  const [fabrics, setFabrics] = useState<FabricDetailsEntity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);


  const getManufacturers = async () => {
    setManufacturers((await getAllManufacturers())!);
  };

  const getFabrics = async () => {
    setFabrics((await getAllFabrics())!);
  };

  const onCategorySelectionChange = useCallback(async (event: any) => {
    console.trace(event.target!.value);
    setSelectedCategory(event.target!.value);
  }, []);

  useEffect(() => {
    getManufacturers();
    getFabrics();
    getAllSubCategories().then(data => {
      setSubCategories(data!);
    });
  }, []);

  const rootcontext: RootContext | null = useContext(rootContext);
  useEffect(() => {
    console.trace(rootcontext?.appName)
  },[rootcontext]);


  useEffect(() => {
    if(context?.selectedData) {
      setValue('productTypeId', context?.productTypes?.find((value,index, array) => {
        return value.name === context?.selectedData?.producttype;
      })?.id!);
      setValue('categoryId',context?.categories?.find((value,index, array) => {
        return value.name === context?.selectedData?.category;
      })?.id!);
      setValue('subCategoryId',subCategories?.find((value, index, array) => {
        return value.name === context?.selectedData?.subcategory;
      })?.id!);
      setValue('productDetails.fabricDetailsId', fabrics?.find((value, index, array) => {
        return (
          value.fabricName === context?.selectedData?.fabricname
        );
      })?.id!);
    }
  });

  useEffect(() => {
    if(selectedCategory) {
      getSubCategoriesByCategory(selectedCategory).then((values) => {
        console.trace(values);
        if(values) {
          setSubCategories(values);
        } 
      })
    }
  }, [selectedCategory]);

  const onSubmit: SubmitHandler<CreateProductDto> = (data) => {
    if (context?.selectedData) {
      console.trace(data);
      context?.handleEditClick(context.selectedData?.productid!, data);
    } else {
      context?.handleNewClick(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* product type */}
      <div className="form-group row">
        <label htmlFor="productType" className="col-sm-4 col-form-label">
          Product Type:
        </label>
        <div className="col-sm-4">
          <select
            id="productType"
            className="form-control"
            {...register("productTypeId", {
              required: true,
            })}
          >
            {context?.productTypes?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* category  */}
      <div className="form-group row">
        <label htmlFor="category" className="col-sm-4 col-form-label">
          Category Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="category"
            className="form-control"
            {...register("categoryId", {
              required: true,
            })}
            onChange={onCategorySelectionChange}
          >
            {context?.categories?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* sub-category  */}
      <div className="form-group row">
        <label htmlFor="sub-category" className="col-sm-4 col-form-label">
          SubCategory Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="sub-category"
            className="form-control"
            {...register("subCategoryId", {
              required: true,
            })}
          >
            {subCategories?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* manufacturers  */}
      <div className="form-group row">
        <label htmlFor="manufacturer" className="col-sm-4 col-form-label">
          Manufacturer Name :{" "}
        </label>
        <div className="col-sm-4">
          <select
            id="manufacturer"
            className="form-control"
            {...register("manufacturerId", {
              required: true,
            })}
          >
            {manufacturers?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="productname" className="col-sm-4 col-form-label">
          Manufacturer Name :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="productname"
            placeholder="product name"
            {...register("productName", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.productname
                : "",
            })}
          />
          {errors.productName && <span>This field is required</span>}
        </div>
      </div>
      {/*product description */}
      <div className="form-group row">
        <label
          htmlFor="product-description"
          className="col-sm-4 col-form-label"
        >
          description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="product-description"
            placeholder="product description"
            {...register("productDescription", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData.productdescription
                : "",
            })}
          />
          {errors.productDescription && <span>This field is required</span>}
        </div>
      </div>
      {/*product skuid */}
      <div className="form-group row">
        <label htmlFor="skuid" className="col-sm-4 col-form-label">
          Skuid :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="skuid"
            placeholder="skuid"
            {...register("skuid", {
              required: true,
              value: context?.selectedData ? context?.selectedData.skuid : "",
            })}
          />
          {errors.skuid && <span>This field is required</span>}
        </div>
      </div>
      {/*product returnExchangePolicy */}
      <div className="form-group row">
        <label
          htmlFor="returnExchangePolicy"
          className="col-sm-4 col-form-label"
        >
          Return exchange policy :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="returnExchangePolicy"
            placeholder="returnExchangePolicy"
            {...register("returnExchangePolicy", {
              required: true,
              value: context?.selectedData ? context?.selectedData.skuid : "",
            })}
          />
          {errors.returnExchangePolicy && <span>This field is required</span>}
        </div>
      </div>
      {/*product actual price */}
      <div className="form-group row">
        <label htmlFor="actualprice" className="col-sm-4 col-form-label">
          Actual Price :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="actualprice"
            placeholder="actual price"
            {...register("actualprice", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.actualprice)
                : 0,
            })}
          />
          {errors.actualprice && <span>This field is required</span>}
        </div>
      </div>
      {/*product offer price */}
      <div className="form-group row">
        <label htmlFor="offerprice" className="col-sm-4 col-form-label">
          Offer Price :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="offerprice"
            placeholder="offer price"
            {...register("offerprice", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.offerprice)
                : 0,
            })}
          />
          {errors.offerprice && <span>This field is required</span>}
        </div>
      </div>
      {/*product cgst */}
      <div className="form-group row">
        <label htmlFor="cgst" className="col-sm-4 col-form-label">
          cgst :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="cgst"
            placeholder="cgst"
            {...register("cgst", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.cgst)
                : 0,
            })}
          />
          {errors.cgst && <span>This field is required</span>}
        </div>
      </div>
      {/*product sgst */}
      <div className="form-group row">
        <label htmlFor="sgst" className="col-sm-4 col-form-label">
          sgst :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="sgst"
            placeholder="sgst"
            {...register("sgst", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.sgst)
                : 0,
            })}
          />
          {errors.sgst && <span>This field is required</span>}
        </div>
      </div>
      {/*product length */}
      <div className="form-group row">
        <label htmlFor="length" className="col-sm-4 col-form-label">
          length :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="length"
            placeholder="length"
            {...register("productDetails.length", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.length)
                : 0,
            })}
          />
          {errors.productDetails?.length && <span>This field is required</span>}
        </div>
      </div>
      {/*product width */}
      <div className="form-group row">
        <label htmlFor="width" className="col-sm-4 col-form-label">
          width :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="width"
            placeholder="width"
            {...register("productDetails.width", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData.width)
                : 0,
            })}
          />
          {errors.productDetails?.width && <span>This field is required</span>}
        </div>
      </div>
      {/*product blouse piece included */}
      <div className="form-group row">
        <label
          htmlFor="isBlousePieceIncluded"
          className="col-sm-4 col-form-label"
        >
          blouse Piece included :{" "}
        </label>
        <div className="col-sm-4">
          <select
            className="form-control"
            id="isBlousePieceIncluded"
            {...register("productDetails.isBlousePieceIncluded", {
              required: true,
              value: context?.selectedData
                ? Boolean(context?.selectedData.blouse_piece)
                : false,
            })}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
          {errors.productDetails?.isBlousePieceIncluded && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/*product blouse piece description */}
      <div className="form-group row">
        <label htmlFor="blouseDescription" className="col-sm-4 col-form-label">
          blouse Piece description :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="blouseDescription"
            {...register("productDetails.blouseDescription", {
              required: true,
              value: context?.selectedData
                ? context?.selectedData?.blouse_desc
                : "",
            })}
          />
          {errors.productDetails?.blouseDescription && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/*product maxPerCart */}
      <div className="form-group row">
        <label htmlFor="maxQuantityPerCart" className="col-sm-4 col-form-label">
          Max Quantity per cart :{" "}
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            id="maxQuantityPerCart"
            {...register("maxQuantityPerCart", {
              required: true,
              value: context?.selectedData
                ? Number(context?.selectedData?.maxQuantityPerCart)
                : 3,
            })}
          />
          {errors.maxQuantityPerCart && (
            <span>This field is required</span>
          )}
        </div>
      </div>
      {/* fabric details */}
      <div className="form-group row">
        <label htmlFor="productType" className="col-sm-4 col-form-label">
          Fabric:
        </label>
        <div className="col-sm-4">
          <select
            id="productType"
            className="form-control"
            {...register("productDetails.fabricDetailsId", {
              required: true,
            })}
          >
            {fabrics.map((option) => (
              <option value={option.id} key={option.id}>
                {option.fabricName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={false}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductDetailsForm;
