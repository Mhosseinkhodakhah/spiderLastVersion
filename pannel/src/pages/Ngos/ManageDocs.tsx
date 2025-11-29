import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import NgoDocList from "../../components/ngos/NgoDocList";

function ManageDocs() {
  return (
    <div>
      <PageMeta title="سمن ها " description="مدیریت مدارک" />
      <PageBreadcrumb pageTitle="سمن ها" subMenu="مدیریت مدارک" />
      <NgoDocList />
    </div>
  );
}

export default ManageDocs;
