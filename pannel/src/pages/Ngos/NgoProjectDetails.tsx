import { useParams } from "react-router";
import moment from "jalali-moment";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useQuery } from "@tanstack/react-query";
import { getSpecificProject } from "../../server/ngos";
import Loading from "../../components/loading";
import ComponentCard from "../../components/common/ComponentCard";
import { object } from "yup";

function NgoProjectDetails() {
  const params = useParams<{ id?: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["getSpecificProject", params.id],
    queryFn: () => getSpecificProject(params?.id || ""),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="سمن ها " description="مدیریت پروژه ها" />
      <PageBreadcrumb
        pageTitle="سمن ها"
        subMenu="مدیریت پروژه ها"
        subTwoMenu="جزئیات پروژه"
        subMenuLink="/ngos/manage-projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <ComponentCard title="نام پروژه">
          <span className="dark:text-white">{data?.data?.name}</span>
        </ComponentCard>
        <ComponentCard title="نام سمن">
          <span className="dark:text-white">{data?.data?.ngo?.name}</span>
        </ComponentCard>
        <ComponentCard title="شهر">
          <span className="dark:text-white">{data?.data?.location?.city}</span>
        </ComponentCard>
        <ComponentCard title="کشور">
          <span className="dark:text-white">
            {data?.data?.location?.country}
          </span>
        </ComponentCard>
        <ComponentCard title="نام سازمان">
          <span className="dark:text-white">
            {data?.data?.organizationName}
          </span>
        </ComponentCard>
        <ComponentCard title="نام مدیر پروژه">
          <span className="dark:text-white">
            {data?.data?.projectManagerName}
          </span>
        </ComponentCard>
        <ComponentCard title="ایمیل مدیر پروژه">
          <span className="dark:text-white">
            {data?.data?.projectManagerEmail}
          </span>
        </ComponentCard>
        <ComponentCard title="تلفن مدیر پروژه">
          <span className="dark:text-white">
            {data?.data?.projectManagerPhone}
          </span>
        </ComponentCard>
        <ComponentCard title="تاریخ شروع">
          <span className="dark:text-white">
            {moment(data?.data?.startDate).locale("fa").format("jYYYY/jMM/jDD")}
          </span>
        </ComponentCard>
        <ComponentCard title="تاریخ پایان">
          <span className="dark:text-white">
            {moment(data?.data?.endDate).locale("fa").format("jYYYY/jMM/jDD")}
          </span>
        </ComponentCard>
        <ComponentCard title="همکاران و ذینفعان">
          <span className="dark:text-white">
            {data?.data?.colleaguesAndStakeholders}
          </span>
        </ComponentCard>
        <ComponentCard title="اطلاعات بیشتر">
          <span className="dark:text-white">{data?.data?.moreInformation}</span>
        </ComponentCard>

        {data?.data?.documentsAndReport && (
          <ComponentCard
            title="اسناد متنی"
            className="col-span-1 md:col-span-2 lg:col-span-3"
            >
            {data?.data?.documentsAndReport?.files.map((item: string) => 
              <>
              {/* <h1>{item}</h1> */}
              <object
                data={item}
                type="application/pdf"
                className="w-full h-[500px]"
              />
              </>
            )}
          </ComponentCard>
        )}
        
        {data?.data?.visualDocuments && (
          <ComponentCard
            title="اسناد تصویری"
            className="col-span-1 md:col-span-2 lg:col-span-3"
          >
            {data?.data?.visualDocuments?.map(
              (item: { files: string[]; title: string }) => (
                <>
                  {Object.keys(item).length>0 && item?.files[0].slice(item?.files[0].length - 3) === "png" ||
                   Object.keys(item).length>0 && item?.files[0].slice(item?.files[0].length - 3) === "jpg" ||
                  Object.keys(item).length>0 && item?.files[0].slice(item?.files[0].length - 4) === "jpeg" ? (
                    <div
                      key={item?.files[0]}
                      className="flex flex-col justify-center items-center gap-2"
                    >
                      <h2 className="dark:text-white text-2xl">
                        {item?.title}
                      </h2>
                      <img
                        alt="file"
                        src={item?.files[0]}
                        className="object-contain max-w-1/3"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )
            )}
          </ComponentCard>
        )}
      </div>
    </div>
  );
}

export default NgoProjectDetails;
