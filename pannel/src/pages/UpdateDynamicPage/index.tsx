import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UpdateContentPage from "../../components/update-dynamic-page/update-content-page";
import { useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { UpdateContentPageRequest } from "../../server/dynamic-page";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { uploadFiles } from "../../server/uploadFiles";
// import convertBlobToFile from "../../utils/convertBlobToFile";

function UpdateDynamicPage() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const mutation = useMutation({
    mutationKey: ["updatePage"],
    mutationFn: (values) => UpdateContentPageRequest(state?.data?._id, values),
    onSuccess: (response: any) => {
      if (response?.success) {
        toast.success("صفحه با موفقیت به روزرسانی شد");
        navigate("/dynamic-pages");
      } else {
        toast.error(response?.error || "خطا در به روزرسانی صفحه");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      peContent: state?.data?.content?.peContent || [],
      enContent: state?.data?.content?.enContent || [],
      ruContent: state?.data?.content?.ruContent || [],
      show: state?.data?.show,
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      console.log('is this here????' , 'HERE IS FOR CREATE??????')
      if (Object.keys(values?.peContent).length > 0) {
        setIsLoading(true);
        for (let i = 0; i < values.peContent.length; i++) {
          const item = values.peContent[i];
          if (item.title === "images" && typeof item.id === "number") {
            const formData = new FormData();
            for (let j = 0; j < item.content.length; j++) {
              formData.append("picture", item.content[j]);
            }
            // till here i had a problem with updating pictures in dynamic pages
            // till here i had a problem with updating pictures in dynamic pages
            // console.log('it comes till here' , formData.getAll('picture'))
            const res = await uploadFiles(formData);  
            setIsLoading(false);
            console.log('its a data'  , res)
            if (res?.success) {
              values.peContent[i].content = res?.data;
              values.enContent[i].content = res?.data;
              values.ruContent[i].content = res?.data;
            } else {
              toast.error(res?.error);
              return;
            }
          }else if(item.title === "images" && typeof item.id !== "number"){
            const formData = new FormData();
            let remainPics = []
            for (let k of item.content){
              if (typeof k !== "string"){
                formData.append("picture", k)
              }else{
                remainPics.push(k)
              }
            }
            console.log('blob blob',formData.getAll("picture"))
            if (formData.getAll("picture").length > 0){
              const res = await uploadFiles(formData);  
              setIsLoading(false);
              // console.log('its a data'  , res)
              if (res?.success) {
                for (let m of res?.data){
                  remainPics.push(m)
                }
                values.peContent[i].content = remainPics;
                values.enContent[i].content = remainPics;
                values.ruContent[i].content = remainPics;
              } else {
                toast.error(res?.error);
                return;
              }
            }
          }
        }

        setIsLoading(false);
        console.log('values after fucking uploading >>>> ' , values)
        mutation.mutate(values);
      } else {
        toast.error("لطفا محتوای صفحه را وارد کنید");
        setIsLoading(false);
        return;
      }
    },
  });

  return (
    <div>
      <PageMeta title="به روزرسانی" description="به روزرسانی محتوای صفحه" />
      <PageBreadcrumb
        pageTitle="به روزرسانی صفحه"
        subMenu="به روزرسانی محتوای صفحه"
      />
      <UpdateContentPage
        formik={formik}
        isLoading={isLoading || mutation.isPending}
      />
    </div>
  );
}

export default UpdateDynamicPage;
