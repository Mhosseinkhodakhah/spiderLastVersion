import { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { uploadFiles } from "../../server/uploadFiles";
import { eventsSchema } from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "../ui/modal";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import DropzoneComponent from "../form/form-elements/DropZone";
import DropzoneVideoComponent from "../form/form-elements/DropZoneVideo";
import Button from "../ui/button/Button";
import { IEvents } from "../../types/events-types";
import { updateEvent } from "../../server/events";
import TextEditor from "../common/TextEditor";
import Checkbox from "../form/input/Checkbox";

function UpdateEvent({
  isOpen,
  onClose,
  refetch,
  data,
}: {
  isOpen: string;
  onClose: () => void;
  refetch: () => void;
  data: any;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [peImageFiles, setPeImageFiles] = useState<File[]>([]);
  const [enImageFiles, setEnImageFiles] = useState<File[]>([]);
  const [ruImageFiles, setRuImageFiles] = useState<File[]>([]);

  const [peVideoFiles, setPeVideoFiles] = useState<File[]>([]);
  const [enVideoFiles, setEnVideoFiles] = useState<File[]>([]);
  const [ruVideoFiles, setRuVideoFiles] = useState<File[]>([]);

  const handleDeleteFile = (url: string, name: string) => {
    const cpValues: any = [...formik.values[name as keyof IEvents]];

    const fileterd = cpValues.filter((f: string) => f !== url);

    formik.setFieldValue(name, fileterd);

    toast.success("تصویر با موفقیت حذف شد");
  };

  const mutation = useMutation<unknown, any, { id: string; values: IEvents }>({
    mutationKey: ["updateEvent"],
    mutationFn: ({ id, values }: { id: string; values: IEvents }) =>
      updateEvent(id, values),
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("رویداد با موفقیت به روزرسانی شد");
        onClose();
        refetch();
        formik.resetForm();
        setPeImageFiles([]);
        setEnImageFiles([]);
        setRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      } else {
        toast.error("رویداد به روزرسانی نشد ، لطفا دوباره امتحان کنید");
        onClose();
        formik.resetForm();
        setPeImageFiles([]);
        setEnImageFiles([]);
        setRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      }
    },
  });

  console.log("dddddddd", data);

  const formik = useFormik<IEvents>({
    initialValues: {
      peTitle: data.peTitle,
      enTitle: data.enTitle,
      ruTitle: data.ruTitle,
      peDescription: data.peDescription,
      enDescription: data.enDescription,
      ruDescription: data.ruDescription,
      peEventsBody: data.peEventsBody,
      enEventsBody: data.enEventsBody,
      ruEventsBody: data.ruEventsBody,
      eventSubject : data?.eventSubject?.length > 0 ? data?.eventSubject : [0],
      pePictures: data.pePictures,
      enPictures: data.enPictures,
      ruPictures: data.ruPictures,
      peVideo: data.peVideo,
      enVideo: data.enVideo,
      ruVideo: data.ruVideo,
    },
    enableReinitialize: true,
    validationSchema: eventsSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (peImageFiles.length) {
        const formData = new FormData();
        peImageFiles.forEach((file) => formData.append("picture", file));

        const response: { data: string[]; success: boolean } =
          await uploadFiles(formData);

        if (response.success) {
          values.pePictures = values.pePictures.concat(response.data);
          toast.success("تصاویر رویداد فارسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد فارسی آپلود نشد");
        }
      }
      if (enImageFiles.length) {
        const formData = new FormData();
        enImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enPictures = values.enPictures.concat(response.data);
          toast.success("تصاویر رویداد انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد انگلیسی آپلود نشد");
        }
      }
      if (ruImageFiles.length) {
        const formData = new FormData();
        ruImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruPictures = values.ruPictures.concat(response.data);
          toast.success("تصاویر رویداد روسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد روسی آپلود نشد");
        }
      }

      if (peVideoFiles.length) {
        const formData = new FormData();
        peVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.peVideo = values.peVideo.concat(response.data);
          toast.success("ویدیو رویداد فارسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد فارسی آپلود نشد");
        }
      }

      if (enVideoFiles.length) {
        const formData = new FormData();
        enVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enVideo = values.enVideo.concat(response.data);
          toast.success("ویدیو رویداد انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد انگلیسی آپلود نشد");
        }
      }

      if (ruVideoFiles.length) {
        const formData = new FormData();
        ruVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruVideo = values.ruVideo.concat(response.data);
          toast.success("ویدیو رویداد روسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد روسی آپلود نشد");
        }
      }

      setIsLoading(false);
      mutation.mutate({ id: data?._id, values });
    },
  });

  return (
    <>
      <Modal isOpen={!!isOpen} onClose={onClose} isFullscreen>
        <h1 className="font-bold text-lg text-center w-full mb-8">
          به روز رسانی رویداد
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <ComponentCard title="عنوان رویداد" className="my-2">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={formik.errors.peTitle ? true : false}
                  {...formik.getFieldProps("peTitle")}
                />
                {formik.errors.peTitle && formik.touched.peTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.peTitle}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formik.errors.enTitle ? true : false}
                  {...formik.getFieldProps("enTitle")}
                />
                {formik.errors.enTitle && formik.touched.enTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.enTitle}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formik.errors.ruTitle ? true : false}
                  {...formik.getFieldProps("ruTitle")}
                />
                {formik.errors.ruTitle && formik.touched.ruTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.ruTitle}
                  </span>
                )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard className="my-2" title="مشخص کردن موضوع و محوریت رویداد">
          <div className="mt-4  flex flex-col gap-4">
            <Checkbox
              label="آموزش"
              checked={formik?.values?.eventSubject?.includes(0)}
              onChange={() => {
                let newData = formik.getFieldProps("eventSubject").value
                if (newData.includes(0)){
                  newData.splice(newData.indexOf(0) , 1)
                }else{
                  newData.push(0)
                }
                formik.setFieldValue("eventSubject", newData);
              }}
            />
            <Checkbox
              label="جوانان"
              checked={formik.values.eventSubject.includes(1)}
              onChange={() => {
                let newData = formik.getFieldProps("eventSubject").value
                if (newData.includes(1)){
                  newData.splice(newData.indexOf(1) , 1)
                }else{
                  newData.push(1)
                }
                formik.setFieldValue("eventSubject", newData);
              }}
            />
            <Checkbox
              label="زنان"
              checked={formik.values.eventSubject.includes(2)}
              onChange={() => {
                let newData = formik.getFieldProps("eventSubject").value
                if (newData.includes(2)){
                  newData.splice(newData.indexOf(2) , 1)
                }else{
                  newData.push(2)
                }
                formik.setFieldValue("eventSubject", newData);
              }}
            />
            <Checkbox
              label="تغییر اقلیم"
              checked={formik.values.eventSubject.includes(3)}
              onChange={() => {
                let newData = formik.getFieldProps("eventSubject").value
                if (newData.includes(3)){
                  newData.splice(newData.indexOf(3) , 1)
                }else{
                  newData.push(3)
                }
                formik.setFieldValue("eventSubject", newData);
              }}
            />
          </div>
        </ComponentCard>



          <ComponentCard title="توضیحات رویداد" className="my-2">
            <div>
              <TextEditor
                title="توضیحات (فارسی)"
                formik={formik}
                name="peDescription"
                lang="fa"
              />
              {/* <Label htmlFor="ru-input">توضیحات فارسی</Label>
              <TextArea
                placeholder="توضیحات فارسی را وارد کنید"
                error={formik.errors.peDescription ? true : false}
                name="peDescription"
                formik={formik}
              /> */}
              {formik.errors.peDescription && formik.touched.peDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.peDescription}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات (انگلیسی)"
                formik={formik}
                name="enDescription"
                lang="en"
              />
              {/* <TextArea
                placeholder="توضیحات انگلیسی را وارد کنید"
                error={formik.errors.enDescription ? true : false}
                formik={formik}
                name="enDescription"
              /> */}
              {formik.errors.enDescription && formik.touched.enDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.enDescription}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات (روسی)"
                formik={formik}
                name="ruDescription"
                lang="en"
              />
              {/* <TextArea
                placeholder="توضیحات روسی را وارد کنید"
                error={formik.errors.ruDescription ? true : false}
                formik={formik}
                name="ruDescription"
              /> */}
              {formik.errors.ruDescription && formik.touched.ruDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.ruDescription}
                </span>
              )}
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات تکمیلی" className="my-2">
            <div>
              <TextEditor
                title="توضیحات تکمیلی (فارسی)"
                formik={formik}
                name="peEventsBody"
                lang="fa"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی فارسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی فارسی را وارد کنید"
                error={formik.errors.peEventsBody ? true : false}
                formik={formik}
                name="peEventsBody"
              /> */}
              {formik.errors.peEventsBody && formik.touched.peEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.peEventsBody}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (انگلیسی)"
                formik={formik}
                name="enEventsBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی انگلیسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی انگلیسی را وارد کنید"
                error={formik.errors.enEventsBody ? true : false}
                formik={formik}
                name="enEventsBody"
              /> */}
              {formik.errors.enEventsBody && formik.touched.enEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.enEventsBody}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (روسی)"
                formik={formik}
                name="ruEventsBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی روسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی روسی را وارد کنید"
                error={formik.errors.ruEventsBody ? true : false}
                formik={formik}
                name="ruEventsBody"
              /> */}
              {formik.errors.ruEventsBody && formik.touched.ruEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.ruEventsBody}
                </span>
              )}
            </div>
          </ComponentCard>
          <ComponentCard title="تصاویر رویداد" className="my-2">
            <DropzoneComponent
              multiple
              title="تصاویر رویداد فارسی"
              onFiles={setPeImageFiles}
              files={peImageFiles}
              update="pePictures"
              formik={formik}
              formikImages={formik?.values?.pePictures}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneComponent
              multiple
              title="تصاویر رویداد انگلیسی"
              onFiles={setEnImageFiles}
              files={enImageFiles}
              update="enPictures"
              formik={formik}
              formikImages={formik?.values?.enPictures}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneComponent
              multiple
              title="تصاویر رویداد روسی"
              onFiles={setRuImageFiles}
              update="ruPictures"
              formik={formik}
              files={ruImageFiles}
              formikImages={formik?.values?.ruPictures}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
          </ComponentCard>
          <ComponentCard title="ویدیو رویداد" className="my-2">
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد فارسی"
              onFiles={setPeVideoFiles}
              files={peVideoFiles}
              formikVideos={formik?.values?.peVideo}
              formik={formik}
              name="peVideo"
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد انگلیسی"
              onFiles={setEnVideoFiles}
              files={enVideoFiles}
              formikVideos={formik?.values?.enVideo}
              formik={formik}
              name="enVideo"
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد روسی"
              onFiles={setRuVideoFiles}
              formikVideos={formik?.values?.ruVideo}
              files={ruVideoFiles}
              formik={formik}
              name="ruVideo"
            />
          </ComponentCard>

          <div className="flex gap-4 p-4 m-4">
            <Button
              type="submit"
              isLoading={mutation.isPending || isLoading}
              disabled={formik.values.peTitle ? false : true}
            >
              ثبت
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
            >
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
      {/* <Confirm
        isOpen={!!isOpenConfirm.url}
        onClose={handleCloseConfirm}
        onSubmit={() => handleDeleteFile()}
        isLoading={false}
        message="آیا میخواهید این تصویر را حذف کنید؟"
      /> */}
    </>
  );
}

export default UpdateEvent;
