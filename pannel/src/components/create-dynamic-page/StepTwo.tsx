import { FormikProps } from "formik";
import Button from "../ui/button/Button";
import { PlusIcon, TrashBinIcon, UpdateIcon } from "../../icons";
import { useState } from "react";
import TitleModal from "./title-modal";
import DescriptionModal from "./DescriptionModal";
import ImageModal from "./ImageModal";
import { Divider } from "@heroui/divider";

interface Props {
  formik: FormikProps<any>;
  onStep: (step: number) => void;
  step: number;
  isLoading: boolean;
}

function StepTwo({ formik, onStep, step, isLoading }: Props) {
  const [isOpenTitle, setIsOpenTitle] = useState<boolean>(false);
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<any>({});
  const [id, setId] = useState<number>(0);

  return (
    <>
      <div className="w-full border-b py-2">
        <h1 className="dark:text-white font-bold text-xl">
          {formik?.values?.hasSubPage &&
            formik?.values?.hasSecondSubPage &&
            "محتوای صفحه فرعی دوم"}
        </h1>
        <h1 className="dark:text-white font-bold text-xl">
          {formik?.values?.hasSubPage &&
            !formik?.values?.hasSecondSubPage &&
            "محتوای صفحه فرعی "}
        </h1>
        <h1 className="dark:text-white font-bold text-xl">
          {!formik?.values?.hasSubPage &&
            !formik?.values?.hasSecondSubPage &&
            "محتوای صفحه اصلی"}
        </h1>
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

      {step === 2 && formik.values.peContent?.length > 0 && (
        <div className="dark:text-white mt-5 flex-col gap-5 flex">
          <hr />
          <h2 className="font-bold text-2xl text-center">پیش نمایش</h2>
          <Divider className="py-5 mt-5 border-black"/>
          {formik.values.peContent?.map((item: any, index: number) => (
            <div key={index} className="flex items-center py-10 gap-2">
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-800"
                startIcon={<TrashBinIcon />}
                onClick={() => {
                  formik.setFieldValue(
                    "peContent",
                    formik.values.peContent.filter(
                      (f: { id: number }) => f.id !== item.id
                    )
                  );
                  formik.setFieldValue(
                    "enContent",
                    formik.values.enContent.filter(
                      (f: { id: number }) => f.id !== item.id
                    )
                  );
                  formik.setFieldValue(
                    "ruContent",
                    formik.values.ruContent.filter(
                      (f: { id: number }) => f.id !== item.id
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
                  if (item?.title === "title") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenTitle(true);
                  }

                  if (item?.title === "description") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenDescription(true);
                  }
                  if (item?.title === "images") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenImage(true);
                  }
                }}
              >
                <span className="sr-only">اصلاح</span>
              </Button>
              {item?.title === "title" && (
                <h1 className="font-bold text-2xl">{item.content}</h1>
              )}
              {item?.title === "description" && (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
              {item?.title === "images" && (
                <div className="grid grid-cols-3 gap-5">
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
      <DescriptionModal
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
          }}
          update={updateValue}
          id={id}
        />
      )}

      <div className="mt-4 flex gap-2">
        <Button
          type={
            !formik?.values?.hasSubPage && !formik?.values?.hasSecondSubPage
              ? "submit"
              : "button"
          }
          onClick={() => {
            if (
              formik?.values?.hasSubPage &&
              formik?.values?.hasSecondSubPage
            ) {
              onStep(step + 1);
            }
          }}
          isLoading={isLoading}
        >
          {!formik?.values?.hasSubPage && !formik?.values?.hasSecondSubPage
            ? "تایید و ساخت صفحه"
            : "بعدی"}
        </Button>
        <Button
          onClick={() => {
            onStep(step - 1);
          }}
          variant="outline"
        >
          قبلی
        </Button>
      </div>
    </>
  );
}

export default StepTwo;
