import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPageContent } from "../server/dynamic-page";
import { useNavigate } from "react-router";

function useTemplateOne(stopLoading?: () => void) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["createPageContent"],
    mutationFn: createPageContent,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success("صفحه با موفقیت ساخته شد");
        navigate("/dynamic-pages");
      } else {
        toast.error(data?.error);
      }
      if (stopLoading) {
        stopLoading();
      }
    },
  });

  const formikTemplateOne = useFormik({
    initialValues: {
      id: "",
      image: [],
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      peContent: "",
      enContent: "",
      ruContent: "",
    },
    onSubmit: async (values: any) => {
      mutation.mutate(values);
    },
  });
  const formikTemplateSubContent = useFormik({
    initialValues: {
      id: "",
      image: [],
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      peContent: "",
      enContent: "",
      ruContent: "",
    },
    onSubmit: async (values: any) => {
      mutation.mutate(values);
    },
  });

  const formikTemplateSecondPage = useFormik({
    initialValues: {
      id: "",
      image: [],
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      peContent: "",
      enContent: "",
      ruContent: "",
    },
    onSubmit: async (values: any) => {
      mutation.mutate(values);
    },
  });

  const formikTemplateThreePage = useFormik({
    initialValues: {
      id: "",
      image: [],
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      table: [],
    },
    onSubmit: async (values: any) => {
      mutation.mutate(values);
    },
  });

  return {
    formikTemplateOne,
    formikTemplateSubContent,
    formikTemplateSecondPage,
    formikTemplateThreePage,
  };
}

export default useTemplateOne;
