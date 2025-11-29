import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {
  getGoodPracticeProjects,
  setGoodPracticeProjects,
} from "../../server/content";
import Loading from "../../components/loading";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";

function ContentGoodPractice() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getGoodPracticeProjects"],
    queryFn: getGoodPracticeProjects,
  });

  const mutation = useMutation({
    mutationKey: ["setGoodPracticeProjects"],
    mutationFn: setGoodPracticeProjects,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه ابتکارات مشترک با موفقیت تغییر کرد");
        formik.resetForm();
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه ابتکارات مشترک تغییر نکرد ، لطفا مجددا تلاش کنید"
        );
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
    },
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("لطفا توضیحات فارسی را وارد کنید"),
      enDescription: Yup.string().required("لطفا توضیحات انگلیسی را وارد کنید"),
      ruDescription: Yup.string().required("لطفا توضیحات روسی را وارد کنید"),
    }),
    enableReinitialize: true,
    onSubmit: (values: any) => {
      mutation.mutate(values);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta
        title="محتوا | ابتکارات مشترک"
        description="محتوای صفحه ابتکارات مشترک"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="ابتکارات مشترک" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="توضیحات نمایش داده شده در صفحه پروژه های ابتکارات مشترک در بالای صفحه">
          <div>
            <TextAreaInput
              title="توضیحات صفحه ابتکارات مشترک (فارسی)"
              formik={formik}
              name="peDescription"
              error={formik.errors.peDescription ? true : false}
              hint={
                typeof formik.errors.peDescription === "string"
                  ? formik.errors.peDescription
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              title="توضیحات صفحه ابتکارات مشترک (انگلیسی)"
              formik={formik}
              name="enDescription"
              error={formik.errors.enDescription ? true : false}
              hint={
                typeof formik.errors.enDescription === "string"
                  ? formik.errors.enDescription
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              title="توضیحات صفحه ابتکارات مشترک (روسی)"
              formik={formik}
              name="ruDescription"
              error={formik.errors.ruDescription ? true : false}
              hint={
                typeof formik.errors.ruDescription === "string"
                  ? formik.errors.ruDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <div className="flex gap-2 mt-2">
          <Button isLoading={mutation.isPending} type="submit">
            ثبت
          </Button>
          <Button variant="outline" onClick={() => formik.resetForm()}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContentGoodPractice;
