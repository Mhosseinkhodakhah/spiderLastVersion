import { useFormik } from "formik";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createDescriptionPage,
  getDescriptionPage,
} from "../../server/content";
import Loading from "../../components/loading";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import toast from "react-hot-toast";
import TextEditor from "../../components/common/TextEditor";

function ContentEducation() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getDescriptionPage"],
    queryFn: () => getDescriptionPage("educations"),
  });

  const mutation = useMutation({
    mutationKey: ["createDescriptionPage"],
    mutationFn: createDescriptionPage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه آموزش با موفقیت تغییر کرد");
        formik.resetForm();
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه آموزش تغییر نکرد ، لطفا مجددا تلاش کنید"
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
      const value = {
        description: {
          peDescription: values.peDescription,
          enDescription: values.enDescription,
          ruDescription: values.ruDescription,
        },
        type: "educations",
      };
      mutation.mutate(value);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="محتوا | آموزش " description="محتوای صفحه آموزش " />
      <PageBreadcrumb pageTitle="محتوا" subMenu="آموزش " />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-">
        <ComponentCard title="توضیحات صفحه ی آموزش سایت در بالای صفحه">
          <div>
            {/* <TextEditor
              title="توضیحات آموزش (فارسی)"
              formik={formik}
              name="peDescription"
              lang="fa"
            /> */}
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش (فارسی)"
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
            {/* <TextEditor
              title="توضیحات آموزش (انگلیسی)"
              formik={formik}
              name="enDescription"
              lang="en"
            /> */}
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش  (انگلیسی)"
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
            {/* <TextEditor
              title="توضیحات آموزش (روسی)"
              formik={formik}
              name="ruDescription"
              lang="en"
            /> */}
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش  (روسی)"
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

export default ContentEducation;
