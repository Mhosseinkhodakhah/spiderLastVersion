import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import toast from "react-hot-toast";

interface Props {
  formik: any;
  isOpen: boolean;
  onClose: () => void;
  update?: any;
  id?: number;
}

function TitleModal({ isOpen, onClose, formik, update, id }: Props) {
  const [peValue, setPeValue] = useState<string>("");
  const [enValue, setEnValue] = useState<string>("");
  const [ruValue, setRuValue] = useState<string>("");
  console.log('its formik ' , formik.values , id)
  
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
  let englishOne = formik.values.enContent[index]?.content
  let russianOne = formik.values.ruContent[index]?.content
  

  useEffect(() => {
     if (id !== 0) {
      setPeValue(
        data?.content || ""
      );
      setEnValue(
        englishOne || ""
      );
      setRuValue(
        russianOne || ""
      );
    } else {
      setPeValue("");
      setEnValue("");
      setRuValue("");
    }
  }, [
    id,
    formik?.values?.peContent,
    formik?.values?.enContent,
    formik?.values?.ruContent,
  ]);

  const handleSubmit = () => {
    if (!peValue || !enValue || !ruValue) {
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
        updatePeContent[0].content = peValue;
        formik.setFieldValue("peContent", cpPeContent);
      }


      let indexOfContent = cpPeContent.indexOf(updatePeContent[0])

      const updateEnContent = cpEnContent.filter((f) => {
        return cpEnContent.indexOf(f) == indexOfContent;
      });

      if (updateEnContent.length > 0) {
        updateEnContent[0].content = enValue;
        formik.setFieldValue("enContent", cpEnContent);
      }

      const updateRuContent = cpRuContent.filter((f) => {
        return cpRuContent.indexOf(f) == indexOfContent;
      });


      if (updateRuContent.length > 0) {
        updateRuContent[0].content = ruValue;
        formik.setFieldValue("ruContent", cpRuContent);
      }



    } else {

      const id = Math.random() * 10000;

      formik.setFieldValue("peContent", [
        ...formik.values.peContent,
        {
          id,
          title: "title",
          content: peValue,
        },
      ]);
      formik.setFieldValue("enContent", [
        ...formik.values.enContent,
        {
          id,
          title: "title",
          content: enValue,
        },
      ]);
      formik.setFieldValue("ruContent", [
        ...formik.values.ruContent,
        {
          id,
          title: "title",
          content: ruValue,
        },
      ]);
    }

    console.log('its the final check for formik' , formik.values)
    
    setPeValue("");
    setEnValue("");
    setRuValue("");

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <h1 className="dark:text-white font-bold text-xl">عنوان صفحه</h1>
      <div className="flex flex-col gap-2 mt-4">
        <Input
          type="text"
          value={peValue}
          onChange={(e) => setPeValue(e.target.value)}
          placeholder="عنوان  فارسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          value={enValue}
          onChange={(e) => setEnValue(e.target.value)}
          placeholder="عنوان انگلیسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          value={ruValue}
          onChange={(e) => setRuValue(e.target.value)}
          placeholder="عنوان روسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-5">
        <Button onClick={handleSubmit}>ذخیره</Button>
      </div>
    </Modal>
  );
}

export default TitleModal;
