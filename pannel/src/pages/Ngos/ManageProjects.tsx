import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import NgoProjectsList from "../../components/ngos/NgoProjectList";

function ManageProjects() {
  return (
    <div>
      <PageMeta title="سمن ها " description="مدیریت پروژه ها" />
      <PageBreadcrumb pageTitle="سمن ها" subMenu="مدیریت پروژه ها" />
      <NgoProjectsList />
    </div>
  );
}

export default ManageProjects;
