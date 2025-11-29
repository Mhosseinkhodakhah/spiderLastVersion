import { FormikProps } from "formik";
import { useState } from "react";
import { PlusIcon, TrashBinIcon, UpdateIcon } from "../../icons";
import Button from "../ui/button/Button";
import TitleModal from "../create-dynamic-page/title-modal";
import ImageModal from "../create-dynamic-page/ImageModal";
import Label from "../form/Label";
import {Divider} from "@heroui/divider";
import DescriptionModalUpdate from "../create-dynamic-page/descriptionUpdatModal";
import UpdateImageModal from "../create-dynamic-page/UpdateImageModal";

interface Props {
  formik: FormikProps<any>;
  isLoading: boolean;
}

function UpdateContentPage({ formik, isLoading }: Props) {
  const [isOpenTitle, setIsOpenTitle] = useState<boolean>(false);
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);
  const [isOpenUpdateImage, setIsOpenUpdateImage] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<any>({});
  const [id, setId] = useState<number>(0);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full border-b py-2">
        <Divider className="py-5" />
        <h1 className="dark:text-white font-bold text-xl">نمایش صفحه</h1>
        <div className="checkbox-wrapper-14 mt-4 flex gap-2 items-center">
          <input
            id="s1-14"
            type="checkbox"
            className="switch"
            defaultChecked={formik.values.show}
            checked={formik.values.show}
            onChange={() => {
              formik.setFieldValue("show", !formik.values.show);
            }}
            />
            <Label>این صفحه نمایش داده شود؟</Label>
        </div>
      </div>
      <div className="w-full  py-2">
        <h1 className="dark:text-white font-bold text-xl">محتوای صفحه</h1>
      </div>

      <div className="flex dark:text-white gap-2 mt-5">
        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenTitle(true)}
        >
          <PlusIcon />
          <span>افزودن عنوان</span>
        </div>

        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenDescription(true)}
        >
          <PlusIcon />
          <span>افزودن توضیحات</span>
        </div>
        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenImage(true)}
        >
          <PlusIcon />
          <span>افزودن تصویر</span>
        </div>
      </div>

      <hr />
      {/* <h2 className="font-bold text-2xl py-5 text-center mb-5">پیش نمایش</h2> */}
      {formik.values.peContent?.length > 0 && (
        <div className="dark:text-white bg-gray-300 rounded-lg mt-5 flex-col flex ">
          {formik.values.peContent?.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 py-5 m-5">
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-800"
                startIcon={<TrashBinIcon />}
                onClick={() => {
                  let content = formik.values.peContent.find((f:any)=>{
                    if (item._id) {
                      return f._id === item._id
                    } else {
                      return f.id === item.id
                    }
                  })
                  let index = formik.values.peContent.indexOf(content)
                  formik.setFieldValue(
                    "peContent",
                    formik.values.peContent.filter(
                      (f : any) => {
                        if (item._id){
                          console.log('its here>>')
                          return f._id !== item._id
                        }else{
                          console.log('its here2>>')
                          return f.id !== item.id
                        }
                      }
                    )
                  );

                  formik.setFieldValue(
                    "enContent",
                    formik.values.enContent.filter(
                      (f : any) => {
                        if (item._id){
                          return formik.values.enContent.indexOf(f) != index 
                        }else{
                          console.log('its here>>4444')
                          return f.id !== item.id
                        }
                      }
                    )
                  );
                  formik.setFieldValue(
                    "ruContent",
                    formik.values.ruContent.filter(
                      (f : any) => {
                        if (item._id){
                          console.log('its here>>555')
                          return formik.values.ruContent.indexOf(f) != index
                        }else{
                          console.log('its here>>666')
                          return f.id !== item.id
                        }
                      }
                    )
                  );
                }}
              >
                <span className="sr-only">حذف</span>
              </Button>
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-800"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  console.log('item isss' , item)
                  if (item?.title === "title") {
                    setUpdateValue(item);
                    setId(item._id);
                    setIsOpenTitle(true);
                  }

                  if (item?.title === "description") {
                    setUpdateValue(item);
                    setId(item._id);
                    setIsOpenDescription(true);
                  }
                  if (item?.title === "images") {
                    setUpdateValue(item);
                    setId(item._id);
                    setIsOpenUpdateImage(true);
                  }
                }}
              >
                <span className="sr-only">اصلاح</span>
              </Button>
              {item?.title === "title" && (
                <div className="flex flex-row w-full gap-[40%] dark:text-black items-center rounded-md border-black p-2 border-[0.5px]">
                  <h3 className="text-center text-xl font-bold">
                    عنوان:
                  </h3>
                  <h1 className="flex font-bold text-2xl text-center">{item.content}</h1>
                  {/* <Divider className="border-black"/> */}
                </div>
              )}
              {item?.title === "description" && (
                <div className="flex flex-row w-full gap-[5%] dark:text-black items-center rounded-md border-black border p-2">
                  <h3 className="text-center text-xl font-bold">
                    توضیحات:
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  {/* <Divider className="border-black"/> */}
                </div>
              )}
              {item?.title === "images" && (
                <div className="flex flex-row w-full gap-[10%] dark:text-black items-center rounded-md border-black border p-2">
                  {/* <Divider className="border-black"/> */}
                  <h3 className="text-center text-xl font-bold">
                    عکس:
                  </h3>
                  <div className="grid grid-cols-3 gap-5 m-3">
                  {item?.content?.map(
                    (image: File | string, imgIndex: number) => (
                      <div key={imgIndex}>
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image) || ""
                          }
                          alt={`Preview ${imgIndex}`}
                          className="mb-2 rounded-lg border border-gray-300"
                        />
                      </div>
                    )
                  )}

                </div>
                  {/* <Divider className="border-black"/> */}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <TitleModal
        formik={formik}
        isOpen={isOpenTitle}
        onClose={() => {
          setIsOpenTitle(false);
          setId(0);
        }}
        update={updateValue}
        id={id}
      />
      <DescriptionModalUpdate
        formik={formik}
        isOpen={isOpenDescription}
        onClose={() => {
          setIsOpenDescription(false);
          setId(0);
        }}
        update={updateValue}
        id={id}
      />

      {isOpenImage && (
        <ImageModal
          isOpen={isOpenImage}
          formik={formik}
          onClose={() => {
            setIsOpenImage(false);
            setId(0);
            console.log('after closing >>>>' , formik.values)
          }}
          update={updateValue}
          id={id}
        />
      )}

      {isOpenUpdateImage && (
        <UpdateImageModal
          isOpen={isOpenUpdateImage}
          formik={formik}
          onClose={() => {
            setIsOpenUpdateImage(false);
            setId(0);
            console.log('after closing >>>> ' , formik.values)
          }}
          update={updateValue}
          id={id}
        />
      )}

      <div className="mt-4 flex gap-2">
        <Button
          type={"submit"}
          isLoading={isLoading}
          disabled={formik?.values.peContent?.length === 0}
        >
          به روز رسانی
        </Button>
      </div>
    </form>
  );
}

export default UpdateContentPage;
