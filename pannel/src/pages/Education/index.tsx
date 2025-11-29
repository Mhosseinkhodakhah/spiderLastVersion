import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EducationList from "../../components/education/EducationLists";
import {getCookie} from '../../utils/cookie'



function EducationPage() {
  let allAccess = getCookie('admin-miras-access')
  console.log('allAccresss', allAccess)
  return (
    <div>
      <PageMeta title="آموزش " description="آموزش" />
      <PageBreadcrumb pageTitle="آموزش" subMenu="لیست آموزش ها" />
      <EducationList />
    </div>
  );
}

export default EducationPage;
