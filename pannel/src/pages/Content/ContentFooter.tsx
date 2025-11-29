import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFooter, getFooter } from "../../server/footer";
import toast from "react-hot-toast";
import { uploadFiles } from "../../server/uploadFiles";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

const ContentFooter = () => {
  const [logo, setLogo] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getFooter"],
    queryFn: () => getFooter(),
  });

  const mutation = useMutation({
    mutationKey: ["createFooter"],
    mutationFn: createFooter,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای فوتر با موفقیت تغییر کرد");
        formik.resetForm();
        setLoading(false);
        refetch();
      } else {
        toast.error("متاسفانه محتوای فوتر تغییر نکرد ، لطفا مجددا تلاش کنید");
        setLoading(false);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      logo: data?.data?.logo,
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
      peAddress: data?.data?.peAddress,
      enAddress: data?.data?.enAddress,
      ruAddress: data?.data?.ruAddress,
      phone: data?.data?.phone,
      gmail: data?.data?.gmail,
      instaLink: data?.data?.instaLink,
      xLink: data?.data?.xLink,
      linkedInLink: data?.data?.linkedInLink,
      faceBookLink: data?.data?.faceBookLink,
    },
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("لطفا توضیحات فارسی را وارد کنید"),
      enDescription: Yup.string().required("لطفا توضیحات انگلیسی را وارد کنید"),
      ruDescription: Yup.string().required("لطفا توضیحات روسی را وارد کنید"),
      peAddress: Yup.string().required("لطفا آدرس فارسی را وارد کنید"),
      enAddress: Yup.string().required("لطفا آدرس انگلیسی را وارد کنید"),
      ruAddress: Yup.string().required("لطفا آدرس روسی را وارد کنید"),
      phone: Yup.string().required("لطفا شماره تلفن را وارد کنید"),
      gmail: Yup.string().required("لطفا ایمیل را وارد کنید"),
      instaLink: Yup.string().required("لطفا لینک اینستاگرام را وارد کنید"),
      xLink: Yup.string().required("لطفا لینک ایکس  را وارد کنید"),
      linkedInLink: Yup.string().required("لطفا لینک لینکدین را وارد کنید"),
      faceBookLink: Yup.string().required("لطفا لینک فیسبوک را وارد کنید"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setLoading(true);

      if (logo.length > 0) {
        const middleFormData = new FormData();

        logo.forEach((file) => {
          middleFormData.append("picture", file);
        });

        const responseLogo = await uploadFiles(middleFormData);

        if (responseLogo.success) {
          values.logo = responseLogo.data;
          toast.success("لوگو با موفقیت آپلود شد");
          setLoading(false);
        } else {
          toast.error("لوگو آپلود نشد ، لطفا دوباره امتحان کنید");
          setLoading(false);

          return;
        }
      }

      setLoading(false);
      mutation.mutate(values);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="محتوا | فوتر" description="محتوای صفحه فوتر" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="فوتر" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="عکس لوگوی فوتر سایت">
        <DropzoneComponent
          title="لوگو"
          multiple={false}
          onFiles={setLogo}
          files={logo}
          formik={formik}
          formikImages={formik?.values?.logo}
          name="logo"
        />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="توضیحات بخش فوتر سایت">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات (فارسی)"
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
              title="توضیحات (انگلیسی)"
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
              title="توضیحات (روسی)"
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
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="آدرس نمایش داده شده در فوتر سایت">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="آدرس (فارسی)"
              formik={formik}
              name="peAddress"
              error={formik.errors.peAddress ? true : false}
              hint={
                typeof formik.errors.peAddress === "string"
                  ? formik.errors.peAddress
                  : ""
              }
            />
          </div>
       
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="آدرس (انگلیسی)"
              formik={formik}
              name="enAddress"
              error={formik.errors.enAddress ? true : false}
              hint={
                typeof formik.errors.enAddress === "string"
                  ? formik.errors.enAddress
                  : ""
              }
            />
          </div>
       
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="آدرس (روسی)"
              formik={formik}
              name="ruAddress"
              error={formik.errors.ruAddress ? true : false}
              hint={
                typeof formik.errors.ruAddress === "string"
                  ? formik.errors.ruAddress
                  : ""
              }
            />
          </div>
         </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="اطلاعات تماس موجود در فوتر سایت">
          <div>
            <Label htmlFor="gmail">ایمیل</Label>
            <Input
              type="email"
              id="gmail"
              error={formik.errors.gmail ? true : false}
              hint={
                typeof formik.errors.gmail === "string"
                  ? formik.errors.gmail
                  : ""
              }
              {...formik.getFieldProps("gmail")}
            />
          </div>
        
          <div>
            <Label htmlFor="phone">شماره تلفن</Label>
            <Input
              type="text"
              id="phone"
              error={formik.errors.phone ? true : false}
              hint={
                typeof formik.errors.phone === "string"
                  ? formik.errors.phone
                  : ""
              }
              {...formik.getFieldProps("phone")}
            />
          </div>

          <div>
            <Label htmlFor="instaLink">لینک اینستاگرام</Label>
            <Input
              type="text"
              id="instaLink"
              error={formik.errors.instaLink ? true : false}
              hint={
                typeof formik.errors.instaLink === "string"
                  ? formik.errors.instaLink
                  : ""
              }
              {...formik.getFieldProps("instaLink")}
            />
          </div>
       
          <div>
            <Label htmlFor="xLink">لینک ایکس</Label>
            <Input
              type="text"
              id="xLink"
              error={formik.errors.xLink ? true : false}
              hint={
                typeof formik.errors.xLink === "string"
                  ? formik.errors.xLink
                  : ""
              }
              {...formik.getFieldProps("xLink")}
            />
          </div>
       
          <div>
            <Label htmlFor="linkedInLink">لینک لینکدین</Label>
            <Input
              type="text"
              id="linkedInLink"
              error={formik.errors.linkedInLink ? true : false}
              hint={
                typeof formik.errors.linkedInLink === "string"
                  ? formik.errors.linkedInLink
                  : ""
              }
              {...formik.getFieldProps("linkedInLink")}
            />
          </div>
       
          <div>
            <Label htmlFor="faceBookLink">لینک فیس بوک</Label>
            <Input
              type="text"
              id="faceBookLink"
              error={formik.errors.faceBookLink ? true : false}
              hint={
                typeof formik.errors.faceBookLink === "string"
                  ? formik.errors.faceBookLink
                  : ""
              }
              {...formik.getFieldProps("faceBookLink")}
            />
          </div>
        </ComponentCard>

        <div className="flex gap-2 mt-2">
          <Button isLoading={mutation.isPending || loading} type="submit">
            ثبت
          </Button>
          <Button variant="outline" onClick={() => formik.resetForm()}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentFooter;
