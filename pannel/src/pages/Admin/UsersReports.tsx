import UserReports from "../../components/admin/UserReports";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

function UsersReportsPage() {
  return (
    <div>
      <PageMeta title="گزارشات کاربران" description="گزارشات کاربران" />
      <PageBreadcrumb pageTitle="کاربران" subMenu="گزارشات کاربران" />
      <UserReports />
    </div>
  );
}

export default UsersReportsPage;
