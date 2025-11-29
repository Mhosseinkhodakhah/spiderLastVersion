import AdminReports from "../../components/admin/AdminReports";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

function AdminReportsPage() {
  return (
    <div>
      <PageMeta title="گزارشات ادمین" description="گزارشات ادمین" />
      <PageBreadcrumb pageTitle="ادمین" subMenu="گزارشات ادمین" />
      <AdminReports />
    </div>
  );
}

export default AdminReportsPage;
