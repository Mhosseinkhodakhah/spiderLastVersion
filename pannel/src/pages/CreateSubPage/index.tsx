import { useLocation } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FormPage from "../../components/create-dynamic-page/FormPage";

function CreateSubPage() {
  const { state } = useLocation();

  return (
    <div>
      <PageMeta title="صفحات داینامیک " description="صفحه فرعی جدید" />
      <PageBreadcrumb pageTitle="صفحات داینامیک" subMenu="صفحه فرعی جدید" />
      <FormPage subPage={state?.id} />
    </div>
  );
}

export default CreateSubPage;
