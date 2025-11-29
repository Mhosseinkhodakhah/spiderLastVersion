import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import NgosList from "../../components/ngos/NgosList";

function ManageNgos() {
  return (
    <div>
      <PageMeta title="سمن ها " description="مدیریت سمن ها" />
      <PageBreadcrumb pageTitle="سمن ها" subMenu="مدیریت سمن ها" />
      <NgosList />
    </div>
  );
}

export default ManageNgos;
