import { ToastContainer } from "react-toastify";
import logo from "../images/logo.png";
import CategoryGrid from "./category/categorygrid";
import FabricGrid from "./fabric/FabricGrid";
import ManufacturerGrid from "./manufacturer/ManufacturerGrid";
import ProductDetailsGrid from "./product-details/ProductDetailsGrid";
import ProductTypeGrid from "./product-type/FabricGrid";
import SubCategoryGrid from "./sub-category/SubCategorygrid";
import "react-toastify/dist/ReactToastify.css";

function index() {
  return (
    <>
      <section className="brandlogo-sec py-3 bg-light d-none d-md-block">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2">
              <a href="/">
                <img src={logo} alt="Logo" className="img-fluid" width="80" />
              </a>
            </div>
            <div className="col-md-10 text-end">
              <a href="/" className="btn btn-primary">Logout</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-dark">
        <div className="container-fluid">
          <div className="d-flex align-items-start d-flex flex-row flex-shrink-0 p-3 text-white">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="text-start nav-link text-light my-2 active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Category Manager
              </button>
              <button
                className="text-start nav-link text-light my-2"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                SubCategory Manager
              </button>
              <button
                className="text-start nav-link text-light my-2"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Fabric Manager
              </button>
              <button
                className="text-start nav-link text-light my-2"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Product Type Manager
              </button>
              <button
                className="text-start nav-link text-light my-2"
                id="v-pills-product-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-product"
                type="button"
                role="tab"
                aria-controls="v-pills-product"
                aria-selected="false"
              >
                Product Manager
              </button>
              <button
                className="text-start nav-link text-light my-2"
                id="v-pills-manufacturer-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-manufacturer"
                type="button"
                role="tab"
                aria-controls="v-pills-manufacturer"
                aria-selected="false"
              >
                Manufacturer Manager
              </button>
            </div>
            <div className="tab-content col-10 px-4 py-5 bg-light" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <CategoryGrid></CategoryGrid>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <SubCategoryGrid></SubCategoryGrid>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
               <FabricGrid></FabricGrid>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                <ProductTypeGrid></ProductTypeGrid>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-product"
                role="tabpanel"
                aria-labelledby="v-pills-product-tab"
              >
                <ProductDetailsGrid></ProductDetailsGrid>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-manufacturer"
                role="tabpanel"
                aria-labelledby="v-pills-manufacturer-tab"
              >
                <ManufacturerGrid></ManufacturerGrid>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="brandlogo-sec bg-light d-none d-md-block">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 text-center text-derk py-3 /">
              <p className="m-0 fw-bold text-primary">Copyright 2024 © Ardhangini Private Limited. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default index;
