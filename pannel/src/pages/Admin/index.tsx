import AdminList from "../../components/admin/AdminList";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

function AdminPage() {
  return (
    <div>
      <PageMeta title="ادمین " description="ادمین" />
      <PageBreadcrumb pageTitle="ادمین" subMenu="لیست ادمین" />
      <AdminList />
    </div>
  );
}

export default AdminPage;
