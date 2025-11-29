import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FormPage from "../../components/create-dynamic-page/FormPage";

function CreateDynamicPage() {
  return (
    <div>
      <PageMeta title="صفحات داینامیک " description="صفحه جدید" />
      <PageBreadcrumb pageTitle="صفحات داینامیک" subMenu="صفحه جدید" />
      <FormPage />
    </div>
  );
}

export default CreateDynamicPage;
