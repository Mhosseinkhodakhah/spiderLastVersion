import { useMutation, useQuery } from "@tanstack/react-query";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {
  createDescriptionPage,
  getDescriptionPage,
} from "../../server/content";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import { useState } from "react";
import { uploadFiles } from "../../server/uploadFiles";

function ContentDocumentRegistration() {
  const [registerFile, setRegisterFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["getDescriptionPage"],
    queryFn: () => getDescriptionPage("create"),
  });

  const mutation = useMutation({
    mutationKey: ["createDescriptionPage"],
    mutationFn: (description: any) =>
      createDescriptionPage({ description, type: "createDocument" }),
    onSuccess: (valeus: any) => {
      if (valeus.success) {
        toast.success("توضیحات صفحه ثبت اسناد و مدارک با موفقیت به روزرسانی شد");
      } else {
        toast.error(
          "توضیحات صفحه ثبت اسناد و مدارک تغییر نکرد ، لطفا دوباره امتحان کنید"
        );
      }
      setLoading(false);
      refetch();
    },
  });

  const formik = useFormik({
    initialValues: {
      pdf: data?.data?.pdf || [],
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
      enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
      ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
    }),

    onSubmit: async (values: any) => {
      if (registerFile.length > 0) {
        setLoading(true);
        const formData = new FormData();

        for (let i = 0; i < registerFile.length; i++) {
          formData.append("picture", registerFile[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.pdf = response.data;
          toast.success("فایل راهنمای ثبت اسناد و مدارک آپلود شد");
        } else {
          toast.error(
            "فایل راهنمای ثبت اسناد و مدارک آپلود نشد ، لطفا دوباره امتحان کنید"
          );
          setLoading(false);

          return;
        }
      }

      mutation.mutate(values);
    },
  });

  return (
    <div>
      <PageMeta title="محتوا | ثبت اسناد و مدارک" description="محتوای صفحه ثبت اسناد و مدارک" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="ثبت اسناد و مدارک" />
      <div className="flex flex-col gap-2">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <ComponentCard title="اطلاعات آموزش ثبت اسناد و مدارک نمایش داده شده در صفحه ثبت اسناد در دشبورد سمن">
          <DropzoneComponent
            accept={{ "application/pdf": [] }}
            title="فایل راهنمای ثبت اسناد و مدارک"
            multiple
            onFiles={setRegisterFile}
            files={registerFile}
            formik={formik}
            formikImages={formik?.values?.pdf}
            name="pdf"
            dropTitle="فایل را بکشید و رها کنید"
            dropDescription="فایل PDF خود را اینجا بکشید و رها کنید"
          />
            <div>
              <TextAreaInput
                // value={message}
                // onChange={(value) => setMessage(value)}
                title="توضیحات ثبت اسناد و مدارک (فارسی)"
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
                title="توضیحات ثبت اسناد و مدارک (انگلیسی)"
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
                title="توضیحات ثبت اسناد و مدارک (روسی)"
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
            <Button type="submit" isLoading={mutation.isPending || loading}>
              ثبت
            </Button>
            <Button variant="outline">انصراف</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContentDocumentRegistration;
