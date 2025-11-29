import { useMutation, useQuery } from "@tanstack/react-query";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { useFormik } from "formik";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import {
  createDescriptionPage,
  getDescriptionPage,
} from "../../server/content";
import toast from "react-hot-toast";
import * as Yup from "yup";

function ContentNgo() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getDescriptionPage"],
    queryFn: () => getDescriptionPage("ngo"),
  });

  const mutation = useMutation({
    mutationKey: ["createDescriptionPage"],
    mutationFn: (description: any) =>
      createDescriptionPage({ description, type: "ngo" }),
    onSuccess: (valeus: any) => {
      if (valeus.success) {
        toast.success("توضیحات صفحه سمن با موفقیت به روزرسانی شد");
      } else {
        toast.error("توضیحات صفحه سمن تغییر نکرد ، لطفا دوباره امتحان کنید");
      }
      refetch();
    },
  });

  const formik = useFormik({
    initialValues: {
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
    },

    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
      enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
      ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
    }),

    onSubmit: (values: any) => {
      mutation.mutate(values);
    },
  });

  return (
    <div>
      <PageMeta title="محتوا | سمن" description="محتوای صفحه سمن" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="سمن" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="توضیحات مربوط به صفحه سمن ها در بالای صفحه">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات سمن (فارسی)"
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
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات سمن (انگلیسی)"
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
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات سمن (روسی)"
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
          <Button type="submit" isLoading={mutation.isPending}>
            ثبت
          </Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </form>
    </div>
  );
}

export default ContentNgo;
