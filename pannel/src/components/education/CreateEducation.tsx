import { useState } from "react";
import { PlusIcon } from "../../icons";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useFormik } from "formik";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/form-elements/DropZone";
import DropzoneVideoComponent from "../form/form-elements/DropZoneVideo";
import { uploadFiles } from "../../server/uploadFiles";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createEducation } from "../../server/education";
import { educationSchema } from "../../utils/validation";
import TextEditor from "../common/TextEditor";

function CreateEducation({ refetch }: { refetch: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [peImageFiles, setPeImageFiles] = useState<File[]>([]);
  const [enImageFiles, setEnImageFiles] = useState<File[]>([]);
  const [ruImageFiles, setRuImageFiles] = useState<File[]>([]);

  const [peVideoFiles, setPeVideoFiles] = useState<File[]>([]);
  const [enVideoFiles, setEnVideoFiles] = useState<File[]>([]);
  const [ruVideoFiles, setRuVideoFiles] = useState<File[]>([]);

  const handleClose = () => setIsOpen(false);

  const mutation = useMutation({
    mutationKey: ["createEducation"],
    mutationFn: createEducation,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("آموزش با موفقیت ایجاد شد");
        handleClose();
        refetch();
        formik.resetForm();
        setPeImageFiles([]);
        setEnImageFiles([]);
        setRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      } else {
        toast.error("آموزش ایجاد نشد ، لطفا دوباره امتحان کنید");
        handleClose();
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

  const formik = useFormik<{
    peTitle: string;
    enTitle: string;
    ruTitle: string;
    peDescription: string;
    enDescription: string;
    ruDescription: string;
    peEducationBody: string;
    enEducationBody: string;
    ruEducationBody: string;
    pePictures: [];
    enPictures: [];
    ruPictures: [];
    peVideo: [];
    enVideo: [];
    ruVideo: [];
  }>({
    initialValues: {
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      peEducationBody: "",
      enEducationBody: "",
      ruEducationBody: "",
      pePictures: [],
      enPictures: [],
      ruPictures: [],
      peVideo: [],
      enVideo: [],
      ruVideo: [],
    },
    validationSchema: educationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (peImageFiles.length) {
        const formData = new FormData();
        // peImageFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < peImageFiles.length; i++) {
          formData.append("picture", peImageFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.pePictures = response.data;
          toast.success("تصاویر آموزش فارسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش فارسی آپلود نشد");
        }
      }
      if (enImageFiles.length) {
        const formData = new FormData();
        // enImageFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < enImageFiles.length; i++) {
          formData.append("picture", enImageFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enPictures = response.data;
          toast.success("تصاویر آموزش انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش انگلیسی آپلود نشد");
        }
      }
      if (ruImageFiles.length) {
        const formData = new FormData();
        // ruImageFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < ruImageFiles.length; i++) {
          formData.append("picture", ruImageFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruPictures = response.data;
          toast.success("تصاویر آموزش روسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش روسی آپلود نشد");
        }
      }

      if (peVideoFiles.length) {
        const formData = new FormData();
        // peVideoFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < peVideoFiles.length; i++) {
          formData.append("picture", peVideoFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.peVideo = response.data;
          toast.success("ویدیو آموزش فارسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش فارسی آپلود نشد");
        }
      }

      if (enVideoFiles.length) {
        const formData = new FormData();
        // enVideoFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < enVideoFiles.length; i++) {
          formData.append("picture", enVideoFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enVideo = response.data;
          toast.success("ویدیو آموزش انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش انگلیسی آپلود نشد");
        }
      }

      if (ruVideoFiles.length) {
        const formData = new FormData();
        // ruVideoFiles.forEach((file) => formData.append("picture", file));

        for (let i = 0; i < ruVideoFiles.length; i++) {
          formData.append("picture", ruVideoFiles[i]);
        }

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruVideo = response.data;
          toast.success("ویدیو آموزش روسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش روسی آپلود نشد");
        }
      }

      setIsLoading(false);
      mutation.mutate(values);
    },
  });

  // console.log("aaaaaaaa", enImageFiles);
  // console.log("aaaaaaaa", ruImageFiles);

  return (
    <>
      <Button endIcon={<PlusIcon />} size="sm" onClick={() => setIsOpen(true)}>
        افزودن آموزش
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} isFullscreen>
        <h1 className="font-bold text-lg text-center w-full mb-8">
          افزودن آموزش جدید
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <ComponentCard title="عنوان آموزش" className="my-2">
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
          <ComponentCard title="توضیحات آموزش" className="my-2">
            <div>
              <TextEditor
                title="توضیحات (فارسی)"
                formik={formik}
                name="peDescription"
                lang="fa"
              />

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
                name="peEducationBody"
                lang="fa"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی فارسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی فارسی را وارد کنید"
                error={formik.errors.peEducationBody ? true : false}
                formik={formik}
                name="peEducationBody"
              /> */}
              {formik.errors.peEducationBody &&
                formik.touched.peEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.peEducationBody}
                  </span>
                )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (انگلیسی)"
                formik={formik}
                name="enEducationBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی انگلیسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی انگلیسی را وارد کنید"
                error={formik.errors.enEducationBody ? true : false}
                formik={formik}
                name="enEducationBody"
              /> */}
              {formik.errors.enEducationBody &&
                formik.touched.enEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.enEducationBody}
                  </span>
                )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (روسی)"
                formik={formik}
                name="ruEducationBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی روسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی روسی را وارد کنید"
                error={formik.errors.ruEducationBody ? true : false}
                formik={formik}
                name="ruEducationBody"
              /> */}
              {formik.errors.ruEducationBody &&
                formik.touched.ruEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.ruEducationBody}
                  </span>
                )}
            </div>
          </ComponentCard>
          <ComponentCard title="تصاویر آموزش" className="my-2">
            <DropzoneComponent
              multiple
              title="تصاویر آموزش فارسی"
              onFiles={setPeImageFiles}
              files={peImageFiles}
              formikImages={formik.values.pePictures}
            />
            <DropzoneComponent
              multiple
              title="تصاویر آموزش انگلیسی"
              onFiles={setEnImageFiles}
              files={enImageFiles}
              formikImages={formik.values.enPictures}
            />
            <DropzoneComponent
              multiple
              title="تصاویر آموزش روسی"
              onFiles={setRuImageFiles}
              files={ruImageFiles}
              formikImages={formik.values.ruPictures}
            />
          </ComponentCard>
          <ComponentCard title="ویدیو آموزش">
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش فارسی"
              onFiles={setPeVideoFiles}
              files={peVideoFiles}
              formikVideos={formik.values.peVideo}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش انگلیسی"
              onFiles={setEnVideoFiles}
              files={enVideoFiles}
              formikVideos={formik.values.enVideo}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش روسی"
              onFiles={setRuVideoFiles}
              files={ruVideoFiles}
              formikVideos={formik.values.ruVideo}
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
                handleClose();
              }}
            >
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CreateEducation;
