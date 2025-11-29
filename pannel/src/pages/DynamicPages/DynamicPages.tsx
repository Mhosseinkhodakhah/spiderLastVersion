import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DynamicPagesList from "../../components/dynamic-pages/DynamicPagesList";

function DynamicPages() {
  return (
    <div>
      <PageMeta title="صفحات داینامیک " description="صفحات" />
      <PageBreadcrumb pageTitle="صفحات داینامیک" subMenu="صفحات" />
      <DynamicPagesList />
    </div>
  );
}

export default DynamicPages;
