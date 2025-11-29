import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import {
  getCompletedProjects,
  setCompletedProjects,
} from "../../server/content";
import Loading from "../../components/loading";

function ContentCompletedProjects() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCompletedProjects"],
    queryFn: getCompletedProjects,
  });

  const mutation = useMutation({
    mutationKey: ["setCompletedProjects"],
    mutationFn: setCompletedProjects,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه پروژه های تکمیل شده با موفقیت تغییر کرد");
        formik.resetForm();
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه تکمیل شده تغییر نکرد ، لطفا مجددا تلاش کنید"
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
      <PageMeta title="محتوا | تکمیل شده" description="محتوای صفحه تکمیل شده" />
      <PageBreadcrumb pageTitle="محتوا" subMenu=" پروژه های تکمیل شده" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="">
          <div>
            <TextAreaInput
              title="توضیحات پروژه های تکمیل شده (فارسی)"
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
              title="توضیحات پروژه های تکمیل شده (انگلیسی)"
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
              title="توضیحات پروژه های تکمیل شده (روسی)"
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

export default ContentCompletedProjects;
