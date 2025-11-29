// import { useState } from "react";
import { useFormik } from "formik";
import StepOne from "./StepOne";
import FormPageType from "../../types/form-page-type";
import { useState } from "react";
import StepTwo from "./StepTwo";
import { uploadFiles } from "../../server/uploadFiles";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPage } from "../../server/dynamic-page";
import { useNavigate } from "react-router";
// import StepTwo from "./StepTwo";
// import StepThree from "./StepThree";
// import useTemplateOne from "../../hooks/useTemplateOne";
// import useCreatePage from "../../hooks/useCreatePage";
// import useTemplateThree from "../../hooks/useTemplteThree";

interface Props {
  subPage?: string;
}

function FormPage({ subPage }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["createPage"],
    mutationFn: (values: FormPageType) => createPage(values, subPage),
    onSuccess: (response: any) => {
      if (response?.success) {
        toast.success("صفحه با موفقیت ایجاد شد");
        navigate("/dynamic-pages");
      } else {
        toast.error(response?.error || "خطا در ایجاد صفحه");
      }
    },
  });

  const handleSetStep = (step: number) => {
    setStep(step);
  };

  const formik = useFormik<FormPageType>({
    initialValues: {
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      path: "",
      hasSubPage: false,
      hasSecondSubPage: false,
      peContent: [],
      enContent: [],
      ruContent: [],
      show: true,
    },
    onSubmit: async (values: FormPageType) => {
      if (Object.keys(values?.peContent).length > 0) {
        console.log(values.peContent);
        setIsLoading(true);
        for (let i = 0; i < values.peContent.length; i++) {
          const item = values.peContent[i];
          if (item.title === "images") {
            const formData = new FormData();
            for (let j = 0; j < item.content.length; j++) {
              formData.append("picture", item.content[j]);
            }
            console.log(formData.getAll("picture"));
            const res = await uploadFiles(formData);
            console.log('rrrrrrrrrr',res)
            setIsLoading(false);

            if (res?.success) {
              values.peContent[i].content = res?.data;
              values.enContent[i].content = res?.data;
              values.ruContent[i].content = res?.data;
            } else {
              toast.error(res?.error);
              return;
            }
          }
        }

        setIsLoading(false);
        mutation.mutate(values);
      } else {
        toast.error("لطفا محتوای صفحه را وارد کنید");
        setIsLoading(false);
        return;
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* //? عنوان و مسیر صفحه */}
        {step === 1 && <StepOne formik={formik} onStep={handleSetStep} />}
        {/* //? قالب صفحه */}
        {step === 2 && (
          <StepTwo
            formik={formik}
            onStep={handleSetStep}
            step={step}
            isLoading={isLoading}
          />
        )}
      </form>
    </>
  );
}

export default FormPage;
