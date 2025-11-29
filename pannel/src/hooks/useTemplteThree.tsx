import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPageContent } from "../server/dynamic-page";
import { useNavigate } from "react-router";

function useTemplateThree(stopLoading?: () => void) {
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
      peTableCols: [],
      enTableCols: [],
      ruTableCols: [],
      peTableRows: [],
      enTableRows: [],
      ruTableRows: [],
    },
    onSubmit: async (values: any) => {
      mutation.mutate(values);
    },
  });

  return {
    formikTemplateThreePage,
  };
}

export default useTemplateThree;
