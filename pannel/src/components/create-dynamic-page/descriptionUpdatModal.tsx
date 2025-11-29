import { Modal } from "../ui/modal";
import { useEffect, useState } from "react";
import DynamicPageTextEditor from "./DynamicPageTextEditor";
import Button from "../ui/button/Button";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formik: any;
  update?: any;
  id?: number;
}

function DescriptionModalUpdate({ isOpen, onClose, formik, update, id }: Props) {
  const [peDescription, setPeDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [ruDescription, setRuDescription] = useState("");
  console.log('its a fucking formik' , update , id)
  let data = formik?.values?.peContent?.find((f: any) => {
     if (!id){
      if (f._id){
        return f._id === update._id    
      }else{
        console.log('its heree')
        return f.id === update.id
      }
    }else{
      if (f._id){
        return f._id === id    
      }else{
        console.log('its heree')
        return f.id === id
      }
    }
  })
  let index = formik.values.peContent.indexOf(data)
  console.log('indexxxx' , index)
  let englishOne = formik.values.enContent[index]?.content
  let russianOne = formik.values.ruContent[index]?.content
  

  useEffect(() => {
    if (id !== 0) {
      setPeDescription(
        data?.content|| ""
      );
      setEnDescription(
        englishOne || ""
      );
      setRuDescription(
        russianOne || ""
      );
    } else {
      setPeDescription("");
      setEnDescription("");
      setRuDescription("");
    }
  }, [
    id,
    formik?.values?.peContent,
    formik?.values?.enContent,
    formik?.values?.ruContent,
  ]);

  const handleSubmit = () => {
    if (!peDescription || !enDescription || !ruDescription) {
      // Handle form submission
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (id !== 0) {
      const cpPeContent = [...formik.values.peContent];
      const cpEnContent = [...formik.values.enContent];
      const cpRuContent = [...formik.values.ruContent];

      const updatePeContent = cpPeContent.filter((f) => {
        if (update._id){
          return f._id === update._id
        }else{
          return f.id === update.id
        }
      });

      if (updatePeContent.length > 0) {
        updatePeContent[0].content = peDescription;
        formik.setFieldValue("peContent", cpPeContent);
      }

      let indexOfContent = cpPeContent.indexOf(updatePeContent[0])


      const updateEnContent = cpEnContent.filter((f) => {
        return cpEnContent.indexOf(f) == indexOfContent;
      });

      if (updateEnContent.length > 0) {
        updateEnContent[0].content = enDescription;
        formik.setFieldValue("enContent", cpEnContent);
      }

      const updateRuContent = cpRuContent.filter((f) => {
        return cpRuContent.indexOf(f) == indexOfContent;
      });
      
      if (updateRuContent.length > 0) {
        updateRuContent[0].content = ruDescription;
        formik.setFieldValue("ruContent", cpRuContent);
      }
    } else {
      const id = Math.random() * 10000;

      formik.setFieldValue("peContent", [
        ...formik.values.peContent,
        {
          id,
          title: "description",
          content: peDescription,
        },
      ]);
      formik.setFieldValue("enContent", [
        ...formik.values.enContent,
        {
          id,
          title: "description",
          content: enDescription,
        },
      ]);
      formik.setFieldValue("ruContent", [
        ...formik.values.ruContent,
        {
          id,
          title: "description",
          content: ruDescription,
        },
      ]);
    }

    setPeDescription("");
    setEnDescription("");
    setRuDescription("");

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen showCloseButton>
      <h1 className="font-bold text-2xl my-5 p-5">توضیحات</h1>

      <div className="flex flex-col gap-5">
        <DynamicPageTextEditor
          title="توضیحات فارسی"
          lang="fa"
          value={peDescription}
          onChange={setPeDescription}
        />
        <DynamicPageTextEditor
          title="توضیحات انگلیسی"
          lang="en"
          value={enDescription}
          onChange={setEnDescription}
        />
        <DynamicPageTextEditor
          title="توضیحات روسی"
          lang="en"
          value={ruDescription}
          onChange={setRuDescription}
        />
      </div>

      <div className="mt-5">
        <Button onClick={handleSubmit}>ذخیره</Button>
      </div>
    </Modal>
  );
}

export default DescriptionModalUpdate;
