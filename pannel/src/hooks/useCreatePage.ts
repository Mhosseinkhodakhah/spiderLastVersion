import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createPage } from "../server/dynamic-page";
import { useFormik } from "formik";
import FormPageType from "../types/form-page-type";
import { uploadFiles } from "../server/uploadFiles";

function useCreatePage(
  startLoading: () => void,
  stopLoading: () => void,
  image: File[],
  subImage: File[],
  secondImage: File[],
  formikTemplateOne: any,
  formikTemplateSubContent: any,
  formikTemplateSecondPage: any
) {
  const mutation = useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
    onSuccess: async (response) => {
      if (response?.success) {
        // اپلود صفحه اول
        //? اگر قالب اول که شامل یک تصویر است انتخاب شده بود
        if (createFormik.values.template === 1) {
          formikTemplateOne.values.id = response?.data?._id;
          const formData = new FormData();
          formData.append("picture", image[0]);

          const reponseFile = await uploadFiles(formData);
          if (reponseFile?.success) {
            formikTemplateOne.values.image = reponseFile?.data;
            toast.success("تصویر صفحه با موفقیت آپلود شد");
            formikTemplateOne.handleSubmit();
          } else {
            toast.error(response?.data?.error);
          }
        }

        //? اگر قالب دوم ک ه شامل اسلایدر است انتخاب شده  بود
        if (createFormik.values.template === 2) {
          formikTemplateOne.values.id = response?.data?._id;
          const formData = new FormData();

          image.forEach((file) => {
            formData.append("picture", file);
          });

          const reponseFile = await uploadFiles(formData);
          if (reponseFile?.success) {
            formikTemplateOne.values.image = reponseFile?.data;
            toast.success("تصاویر صفحه با موفقیت آپلود شدند");
            formikTemplateOne.handleSubmit();
          } else {
            toast.error(response?.data?.error);
          }
        }
        if (response?.data?.Children.length === 1) {
          if (createFormik.values.template === 1) {
            formikTemplateSubContent.values.id =
              response?.data?.Children[0]._id;
            const formData = new FormData();
            formData.append("picture", subImage[0]);

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSubContent.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSubContent.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }
          if (createFormik.values.template === 2) {
            formikTemplateSubContent.values.id =
              response?.data?.Children[0]._id;
            const formData = new FormData();

            subImage.forEach((file) => {
              formData.append("picture", file);
            });

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSubContent.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSubContent.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }
        } else if (response?.data?.Children.length > 1) {
          //? اگر قالب اول برای صفحه فرعی انتخاب شده بود
          if (createFormik.values.template === 1) {
            formikTemplateSubContent.values.id =
              response?.data?.Children[0]._id;
            const formData = new FormData();
            formData.append("picture", subImage[0]);

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSubContent.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSubContent.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }

          //? اگر قالب دوم برای صفحه فرعی انتخاب شده بود
          if (createFormik.values.template === 2) {
            formikTemplateSubContent.values.id =
              response?.data?.Children[0]._id;
            const formData = new FormData();

            subImage.forEach((file) => {
              formData.append("picture", file);
            });

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSubContent.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSubContent.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }

          //? اگر قالب اول برای صفحه سوم انتخاب شده بود
          if (createFormik.values.template === 1) {
            formikTemplateSecondPage.values.id =
              response?.data?.Children[1]._id;
            const formData = new FormData();
            formData.append("picture", secondImage[0]);

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSecondPage.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSecondPage.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }
          //? اگر قالب دوم برای صفحه سوم انتخاب شده بود
          if (createFormik.values.template === 2) {
            formikTemplateSecondPage.values.id =
              response?.data?.Children[1]._id;
            const formData = new FormData();

            secondImage?.forEach((file) => {
              formData.append("picture", file);
            });

            const reponseFile = await uploadFiles(formData);
            if (reponseFile?.success) {
              formikTemplateSecondPage.values.image = reponseFile?.data;
              toast.success("تصویر صفحه با موفقیت آپلود شد");
              formikTemplateSecondPage.handleSubmit();
            } else {
              toast.error(response?.data?.error);
            }
          }
        }
      } else {
        toast.error(response?.error);
        stopLoading();
      }
    },
  });

  const createFormik = useFormik<FormPageType>({
    initialValues: {
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      path: "",
      hasSubPage: false,
      hasSecondSubPage: false,
    },
    onSubmit: async (values: any) => {
      startLoading();
      mutation.mutate(values);
    },
  });

  return { createFormik };
}

export default useCreatePage;
