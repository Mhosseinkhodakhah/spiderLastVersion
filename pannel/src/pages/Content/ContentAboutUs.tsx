import { useMutation, useQuery } from "@tanstack/react-query";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";
import { createAboutUs, getAboutUs } from "../../server/about-us";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../components/loading";
import { useState } from "react";
import { uploadFiles } from "../../server/uploadFiles";
import TextEditor from "../../components/common/TextEditor";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

function ContentAboutUs() {
  const [middleFiles, setMiddleFiles] = useState<File[]>([]);
  const [firstBossFile, setFirstBossFile] = useState<File[]>([]);
  const [secondBossFile, setSecondBossFile] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAboutUs"],
    queryFn: () => getAboutUs(),
  });

  const mutation = useMutation({
    mutationKey: ["createAboutUs"],
    mutationFn: createAboutUs,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه درباره ما با موفقیت تغییر کرد");
        formik.resetForm();
        setLoading(false);
        refetch();
        setFirstBossFile([]);
        setSecondBossFile([]);
      } else {
        toast.error(
          "متاسفانه محتوای صفحه درباره ما تغییر نکرد ، لطفا مجددا تلاش کنید"
        );
        setLoading(false);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      middleImages: data?.data?.middleImages,
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
      peTitle: data?.data?.peTitle,
      enTitle: data?.data?.enTitle,
      ruTitle: data?.data?.ruTitle,
      peMiddleImageDescription: data?.data?.peMiddleImageDescription,
      enMiddleImageDescription: data?.data?.enMiddleImageDescription,
      ruMiddleImageDescription: data?.data?.ruMiddleImageDescription,
      peMissionAndGoals: data?.data?.peMissionAndGoals,
      enMissionAndGoals: data?.data?.enMissionAndGoals,
      ruMissionAndGoals: data?.data?.ruMissionAndGoals,
      peFirstManagerDescription: data?.data?.peFirstManagerDescription,
      enFirstManagerDescription: data?.data?.enFirstManagerDescription,
      ruFirstManagerDescription: data?.data?.ruFirstManagerDescription,
      firstManagerImage: data?.data?.firstManagerImage
        ? data?.data?.firstManagerImage
        : [],
      peFirstManagerFooterTitle: data?.data?.peFirstManagerFooterTitle
        ? data?.data?.peFirstManagerFooterTitle
        : "",
      enFirstManagerFooterTitle: data?.data?.enFirstManagerFooterTitle
        ? data?.data?.enFirstManagerFooterTitle
        : "",
      ruFirstManagerFooterTitle: data?.data?.ruFirstManagerFooterTitle
        ? data?.data?.ruFirstManagerFooterTitle
        : "",
      peFirstManagerFooterDescription: data?.data
        ?.peFirstManagerFooterDescription
        ? data?.data?.peFirstManagerFooterDescription
        : "",
      enFirstManagerFooterDescription: data?.data
        ?.enFirstManagerFooterDescription
        ? data?.data?.enFirstManagerFooterDescription
        : "",
      ruFirstManagerFooterDescription: data?.data
        ?.ruFirstManagerFooterDescription
        ? data?.data?.ruFirstManagerFooterDescription
        : "",
      permitedToShowFirstManager: data?.data?.permitedToShowFirstManager
        ? data?.data?.permitedToShowFirstManager
        : false,
      secondManagerImage: data?.data?.secondManagerImage
        ? data?.data?.secondManagerImage
        : [],
      peSecondManagerDescription: data?.data?.peSecondManagerDescription,
      enSecondManagerDescription: data?.data?.enSecondManagerDescription,
      ruSecondManagerDescription: data?.data?.ruSecondManagerDescription,
      peSecondManagerFooterTitle: data?.data?.peSecondManagerFooterTitle
        ? data?.data?.peSecondManagerFooterTitle
        : "",
      enSecondManagerFooterTitle: data?.data?.enSecondManagerFooterTitle
        ? data?.data?.enSecondManagerFooterTitle
        : "",
      ruSecondManagerFooterTitle: data?.data?.ruSecondManagerFooterTitle
        ? data?.data?.ruSecondManagerFooterTitle
        : "",
      peSecondManagerFooterDescription: data?.data
        ?.peSecondManagerFooterDescription
        ? data?.data?.peSecondManagerFooterDescription
        : "",
      enSecondManagerFooterDescription: data?.data
        ?.enSecondManagerFooterDescription
        ? data?.data?.enSecondManagerFooterDescription
        : "",
      ruSecondManagerFooterDescription: data?.data
        ?.ruSecondManagerFooterDescription
        ? data?.data?.ruSecondManagerFooterDescription
        : "",
      permitedToShowSecondManager: data?.data?.permitedToShowSecondManager
        ? data?.data?.permitedToShowSecondManager
        : false,
      EducationCardLink: data?.data?.EducationCardLink,
      YouthCardLink: data?.data?.YouthCardLink,
      WomenCardLink: data?.data?.WomenCardLink,
      climateChangeCardLink: data?.data?.climateChangeCardLink,
    },
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("لطفا توضیحات فارسی را وارد کنید"),
      enDescription: Yup.string().required("لطفا توضیحات انگلیسی را وارد کنید"),
      ruDescription: Yup.string().required("لطفا توضیحات روسی را وارد کنید"),
      peTitle: Yup.string().required("لطفا عنوان فارسی را وارد کنید"),
      enTitle: Yup.string().required("لطفا عنوان انگلیسی را وارد کنید"),
      ruTitle: Yup.string().required("لطفا عنوان روسی را وارد کنید"),
      peMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی فارسی را وارد کنید"
      ),
      enMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی انگلیسی را وارد کنید"
      ),
      ruMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی روسی را وارد کنید"
      ),
      peMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (فارسی) را وارد کنید"
      ),
      enMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (انگلیسی) را وارد کنید"
      ),
      ruMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (روسی) را وارد کنید"
      ),

      peFirstManagerDescription: Yup.string().required(
        "پیام فارسی مدیر الزامی است"
      ),
      enFirstManagerDescription: Yup.string().required(
        "پیام انگلیسی مدیر الزامی است"
      ),
      ruFirstManagerDescription: Yup.string().required(
        "پیام روسی مدیر الزامی است"
      ),
      peFirstManagerFooterTitle: Yup.string().required(
        "عنوان فارسی پاورقی الزامی است"
      ),
      enFirstManagerFooterTitle: Yup.string().required(
        "عنوان انگلیسی پاورقی الزامی است"
      ),
      ruFirstManagerFooterTitle: Yup.string().required(
        "عنوان روسی پاورقی الزامی است"
      ),
      peFirstManagerFooterDescription: Yup.string().required(
        "توضیحات فارسی پاورقی الزامی است"
      ),
      enFirstManagerFooterDescription: Yup.string().required(
        "توضیحات انگلیسی پاورقی الزامی است"
      ),
      ruFirstManagerFooterDescription: Yup.string().required(
        "توضیحات روسی پاورقی الزامی است"
      ),
      peSecondManagerDescription: Yup.string().required(
        "توضیحات فارسی مدیر الزامی است"
      ),
      enSecondManagerDescription: Yup.string().required(
        "توضیحات انگلیسی مدیر الزامی است"
      ),
      ruSecondManagerDescription: Yup.string().required(
        "توضیحات روسی مدیر الزامی است"
      ),
      peSecondManagerFooterTitle: Yup.string().required(
        "عنوان فارسی پاورقی الزامی است"
      ),
      enSecondManagerFooterTitle: Yup.string().required(
        "عنوان انگلیسی پاورقی الزامی است"
      ),
      ruSecondManagerFooterTitle: Yup.string().required(
        "عنوان روسی پاورقی الزامی است"
      ),
      peSecondManagerFooterDescription: Yup.string().required(
        "توضیحات فارسی پاورقی الزامی است"
      ),
      enSecondManagerFooterDescription: Yup.string().required(
        "توضیحات انگلیسی پاورقی الزامی است"
      ),
      ruSecondManagerFooterDescription: Yup.string().required(
        "توضیحات روسی پاورقی الزامی است"
      ),
    }),
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setLoading(true);
      console.log('seted value isss>>>>' , values )
      if (
        firstBossFile.length > 0 ||
        secondBossFile.length > 0 ||
        middleFiles.length > 0
      ) {
        if (middleFiles.length > 0) {
          const middleFormData = new FormData();

          middleFiles.forEach((file) => {
            middleFormData.append("picture", file);
          });
          console.log("its hereeee", middleFiles);
          const responseMiddle = await uploadFiles(middleFormData);

          if (responseMiddle.success) {
            values.middleImages = values.middleImages.concat(
              responseMiddle.data
            );
            toast.success("تصاویر درباره ما آپلود شدند");
            setLoading(false);
          } else {
            toast.error(
              "تصاویر درباره ما آپلود نشدند ، لطفا دوباره امتحان کنید"
            );
            setLoading(false);

            return;
          }
        }
        if (firstBossFile.length > 0) {
          const firstBossFormData = new FormData();

          firstBossFile.forEach((file) => {
            firstBossFormData.append("picture", file);
          });
          console.log('type of the firstbosss' , firstBossFormData.getAll("picture"))
          const responseFirstBoss = await uploadFiles(firstBossFormData);

          if (responseFirstBoss.success) {
            values.firstManagerImage = responseFirstBoss.data;
            toast.success("تصویر مدیر اول آپلود شد");
            setLoading(false);
          } else {
            toast.error("تصویر مدیر اول آپلود نشد ، لطفا دوباره امتحان کنید");
            setLoading(false);

            return;
          }
        }
        if (secondBossFile.length > 0) {
          setLoading(true);
          const secondBossFormData = new FormData();

          secondBossFile.forEach((file) => {
            secondBossFormData.append("picture", file);
          });

          const responseSecondBoss = await uploadFiles(secondBossFormData);

          if (responseSecondBoss.success) {
            values.secondManagerImage = responseSecondBoss.data;
            toast.success("تصویر مدیر دوم آپلود شد");
            setLoading(false);
          } else {
            toast.error("تصویر مدیر دوم آپلود نشد ، لطفا دوباره امتحان کنید");
            setLoading(false);

            return;
          }
        }

        // setLoading(false);

        mutation.mutate(values);
      } else {
        // console.log("vvvv", values);

        mutation.mutate(JSON.stringify(values));
      }
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <PageMeta
        title="محتوا | درباره ما"
        description="محتوای صفحه درباه ما سایت"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="درباه ما" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard
          title="عنوان درباره ما"
          desc="در این بخش توضیحات مختصری که در صفحه ی درباره ی ما در بالای صفحه قرار دارد وارد می شود."
        >
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (فارسی)"
              formik={formik}
              name="peTitle"
              error={formik.errors.peTitle ? true : false}
              hint={
                typeof formik.errors.peTitle === "string"
                  ? formik.errors.peTitle
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (انگلیسی)"
              formik={formik}
              name="enTitle"
              error={formik.errors.enTitle ? true : false}
              hint={
                typeof formik.errors.enTitle === "string"
                  ? formik.errors.enTitle
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (روسی)"
              formik={formik}
              name="ruTitle"
              error={formik.errors.ruTitle ? true : false}
              hint={
                typeof formik.errors.ruTitle === "string"
                  ? formik.errors.ruTitle
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard
          title="متن درباره ما"
          desc="متن درباره ما در وسط صفحه ی درباره ما به همراه عکسی که در بخش بعدی ست می شود."
        >
          <div>
            <TextEditor
              title="توضیحات درباه ما (فارسی)"
              formik={formik}
              name="peDescription"
              lang="fa"
            />
          </div>

          <div>
            <TextEditor
              title="توضیحات درباه ما (انگلیسی)"
              formik={formik}
              name="enDescription"
              lang="en"
            />
          </div>

          <TextEditor
            title="توضیحات درباه ما (روسی)"
            formik={formik}
            name="ruDescription"
            lang="en"
          />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <DropzoneComponent
          title="تصاویر مربوط به متن درباره ما در وسط صفحه درباره ما."
          onFiles={setMiddleFiles}
          files={middleFiles}
          formik={formik}
          formikImages={formik.values.middleImages}
          name="middleImages"
          multiple
          max={2}
        />
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard
          title="توضیحات تکمیلی"
          desc="توضیحات تکمیلی مربوط به درباره ما در وسط صفحه درباره ما در کنار عکس."
        >
          <div>
            <TextEditor
              title="توضیحات تصاویر میانی (فارسی)"
              formik={formik}
              name="peMiddleImageDescription"
              lang="fa"
            />
          </div>
          <div>
            <TextEditor
              title="توضیحات تصاویر میانی (انگلیسی)"
              formik={formik}
              name="enMiddleImageDescription"
              lang="en"
            />
          </div>

          <div>
            <TextEditor
              title="توضیحات تصاویر میانی (روسی)"
              formik={formik}
              name="ruMiddleImageDescription"
              lang="en"
            />
          </div>
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard
          title="اهداف و دستاورد ها"
          desc="اهداف و دستاورد ها در صفحه درباره ما در انتهای صفحه"
        >
          <div>
            <TextEditor
              title="توضیحات اهداف و دستاورد ها (فارسی)"
              formik={formik}
              name="peMissionAndGoals"
              lang="fa"
            />
          </div>

          <div>
            <TextEditor
              title="توضیحات اهداف و دستاورد ها (انگلیسی)"
              formik={formik}
              name="enMissionAndGoals"
              lang="en"
            />
          </div>

          <div>
            <TextEditor
              title="توضیحات اهداف و دستاورد ها (روسی)"
              formik={formik}
              name="ruMissionAndGoals"
              lang="en"
            />
          </div>
        </ComponentCard>
                   
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard
          title="لینک کارت های رنگی"
          desc="لینک های مرتبط به مطالعه بیشتر بر روی کارت های رنگی"
        >
          <div>
            <Label htmlFor="pe-input"> لینک کارت آموزش در صفحه درباره ما </Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="لینک کارت آموزش در صفحه درباره ما"
              error={formik.errors.EducationCardLink ? true : false}
              {...formik.getFieldProps("EducationCardLink")}
            />
            {formik.errors.EducationCardLink &&
              formik.touched.EducationCardLink && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.EducationCardLink ===
                    "string" && formik.errors.EducationCardLink}
                </span>
              )}
          </div>

          <div>
            <Label htmlFor="pe-input"> لینک کارت جوانان در صفحه درباره ما </Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="لینک کارت جوانان در صفحه درباره ما"
              error={formik.errors.YouthCardLink ? true : false}
              {...formik.getFieldProps("YouthCardLink")}
            />
            {formik.errors.YouthCardLink &&
              formik.touched.YouthCardLink && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.YouthCardLink ===
                    "string" && formik.errors.YouthCardLink}
                </span>
              )}
          </div>


           <div>
            <Label htmlFor="pe-input"> لینک کارت زنان در صفحه درباره ما </Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="لینک کارت زنان در صفحه درباره ما"
              error={formik.errors.WomenCardLink ? true : false}
              {...formik.getFieldProps("WomenCardLink")}
            />
            {formik.errors.WomenCardLink &&
              formik.touched.WomenCardLink && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.WomenCardLink ===
                    "string" && formik.errors.WomenCardLink}
                </span>
              )}
          </div>
           <div>
            <Label htmlFor="pe-input"> لینک کارت زنان در صفحه درباره ما </Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="لینک کارت زنان در صفحه درباره ما"
              error={formik.errors.climateChangeCardLink ? true : false}
              {...formik.getFieldProps("climateChangeCardLink")}
            />
            {formik.errors.climateChangeCardLink &&
              formik.touched.climateChangeCardLink && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.climateChangeCardLink ===
                    "string" && formik.errors.climateChangeCardLink}
                </span>
              )}
          </div>
        </ComponentCard>

        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="بخش تنظیم پیام و عکس مدیر اول برای نشان دادن و همچنین نشان دادن یا ندادن پیام مدیر در انتهای بخش مشخص می شود.">
          <DropzoneComponent
            title="تصویر مدیر اول"
            multiple={false}
            onFiles={setFirstBossFile}
            files={firstBossFile}
            formik={formik}
            formikImages={formik?.values?.firstManagerImage}
            name="firstManagerImage"
          />

          <div>
            <TextEditor
              title="پیام مدیر (فارسی)"
              formik={formik}
              name="peFirstManagerDescription"
              lang="fa"
            />
          </div>
          <div>
            <TextEditor
              title="پیام مدیر (انگلیسی)"
              formik={formik}
              name="enFirstManagerDescription"
              lang="en"
            />
          </div>
          <div>
            <TextEditor
              title="پیام مدیر (روسی)"
              formik={formik}
              name="ruFirstManagerDescription"
              lang="en"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="pe-input"> عنوان پاورقی (فارسی)</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="عنوان پاورقی را وارد کنید (فارسی)"
                error={formik.errors.peFirstManagerFooterTitle ? true : false}
                {...formik.getFieldProps("peFirstManagerFooterTitle")}
              />
              {formik.errors.peFirstManagerFooterTitle &&
                formik.touched.peFirstManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.peFirstManagerFooterTitle ===
                      "string" && formik.errors.peFirstManagerFooterTitle}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="en-input"> عنوان پاورقی (انگلیسی)</Label>
              <Input
                type="text"
                id="en-input"
                placeholder="عنوان پاورقی را وارد کنید (انگلیسی)"
                error={formik.errors.enFirstManagerFooterTitle ? true : false}
                {...formik.getFieldProps("enFirstManagerFooterTitle")}
              />
              {formik.errors.enFirstManagerFooterTitle &&
                formik.touched.enFirstManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.enFirstManagerFooterTitle ===
                      "string" && formik.errors.enFirstManagerFooterTitle}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input"> عنوان پاورقی (روسی)</Label>
              <Input
                type="text"
                id="ru-input"
                placeholder="عنوان پاورقی را وارد کنید (روسی)"
                error={formik.errors.ruFirstManagerFooterTitle ? true : false}
                {...formik.getFieldProps("ruFirstManagerFooterTitle")}
              />
              {formik.errors.ruFirstManagerFooterTitle &&
                formik.touched.ruFirstManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.ruFirstManagerFooterTitle ===
                      "string" && formik.errors.ruFirstManagerFooterTitle}
                  </span>
                )}
            </div>
          </div>

          <TextAreaInput
            title="توضیحات پاورقی (فارسی)"
            formik={formik}
            name="peFirstManagerFooterDescription"
            error={formik.errors.peFirstManagerFooterDescription ? true : false}
            hint={
              typeof formik.errors.peFirstManagerFooterDescription === "string"
                ? formik.errors.peFirstManagerFooterDescription
                : ""
            }
          />
          <TextAreaInput
            title="توضیحات پاورقی (انگلیسی)"
            formik={formik}
            name="enFirstManagerFooterDescription"
            error={formik.errors.enFirstManagerFooterDescription ? true : false}
            hint={
              typeof formik.errors.enFirstManagerFooterDescription === "string"
                ? formik.errors.enFirstManagerFooterDescription
                : ""
            }
          />
          <TextAreaInput
            title="توضیحات پاورقی (روسی)"
            formik={formik}
            name="ruFirstManagerFooterDescription"
            error={formik.errors.ruFirstManagerFooterDescription ? true : false}
            hint={
              typeof formik.errors.ruFirstManagerFooterDescription === "string"
                ? formik.errors.ruFirstManagerFooterDescription
                : ""
            }
          />

          <div className="mt-4 flex flex-col gap-2">
            <Checkbox
              label="نمایش پیام مدیر"
              checked={formik.values.permitedToShowFirstManager}
              onChange={() => {
                formik.setFieldValue(
                  "permitedToShowFirstManager",
                  !formik.values.permitedToShowFirstManager
                );
              }}
            />
          </div>
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="بخش تنظیم پیام و عکس مدیر دوم برای نشان دادن و همچنین نشان دادن یا ندادن پیام مدیر در انتهای بخش تعیین میشود">
          <DropzoneComponent
            title="تصویر مدیر دوم"
            multiple={false}
            onFiles={setSecondBossFile}
            files={secondBossFile}
            formik={formik}
            formikImages={formik?.values?.secondManagerImage}
            name="secondManagerImage"
          />

          <div>
            <TextEditor
              title="پیام مدیر (فارسی)"
              formik={formik}
              name="peSecondManagerDescription"
              lang="fa"
            />
          </div>
          <div>
            <TextEditor
              title="پیام مدیر (انگلیسی)"
              formik={formik}
              name="enSecondManagerDescription"
              lang="en"
            />
          </div>
          <div>
            <TextEditor
              title="پیام مدیر (روسی)"
              formik={formik}
              name="ruSecondManagerDescription"
              lang="en"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="pe-input"> عنوان پاورقی (فارسی)</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="عنوان پاورقی را وارد کنید (فارسی)"
                error={formik.errors.peSecondManagerFooterTitle ? true : false}
                {...formik.getFieldProps("peSecondManagerFooterTitle")}
              />
              {formik.errors.peSecondManagerFooterTitle &&
                formik.touched.peSecondManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.peSecondManagerFooterTitle ===
                      "string" && formik.errors.peSecondManagerFooterTitle}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="en-input"> عنوان پاورقی (انگلیسی)</Label>
              <Input
                type="text"
                id="en-input"
                placeholder="عنوان پاورقی را وارد کنید (انگلیسی)"
                error={formik.errors.enSecondManagerFooterTitle ? true : false}
                {...formik.getFieldProps("enSecondManagerFooterTitle")}
              />
              {formik.errors.enSecondManagerFooterTitle &&
                formik.touched.enSecondManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.enSecondManagerFooterTitle ===
                      "string" && formik.errors.enSecondManagerFooterTitle}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input"> عنوان پاورقی (روسی)</Label>
              <Input
                type="text"
                id="ru-input"
                placeholder="عنوان پاورقی را وارد کنید (روسی)"
                error={formik.errors.ruSecondManagerFooterTitle ? true : false}
                {...formik.getFieldProps("ruSecondManagerFooterTitle")}
              />
              {formik.errors.ruSecondManagerFooterTitle &&
                formik.touched.ruSecondManagerFooterTitle && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.ruSecondManagerFooterTitle ===
                      "string" && formik.errors.ruSecondManagerFooterTitle}
                  </span>
                )}
            </div>
          </div>

          <TextAreaInput
            title="توضیحات پاورقی (فارسی)"
            formik={formik}
            name="peSecondManagerFooterDescription"
            error={
              formik.errors.peSecondManagerFooterDescription ? true : false
            }
            hint={
              typeof formik.errors.peSecondManagerFooterDescription === "string"
                ? formik.errors.peSecondManagerFooterDescription
                : ""
            }
          />
          <TextAreaInput
            title="توضیحات پاورقی (انگلیسی)"
            formik={formik}
            name="enSecondManagerFooterDescription"
            error={
              formik.errors.enSecondManagerFooterDescription ? true : false
            }
            hint={
              typeof formik.errors.enSecondManagerFooterDescription === "string"
                ? formik.errors.enSecondManagerFooterDescription
                : ""
            }
          />
          <TextAreaInput
            title="توضیحات پاورقی (روسی)"
            formik={formik}
            name="ruSecondManagerFooterDescription"
            error={
              formik.errors.ruSecondManagerFooterDescription ? true : false
            }
            hint={
              typeof formik.errors.ruSecondManagerFooterDescription === "string"
                ? formik.errors.ruSecondManagerFooterDescription
                : ""
            }
          />

          <div className="mt-4 flex flex-col gap-2">
            <Checkbox
              label="نمایش پیام مدیر"
              checked={formik.values.permitedToShowSecondManager}
              onChange={() => {
                formik.setFieldValue(
                  "permitedToShowSecondManager",
                  !formik.values.permitedToShowSecondManager
                );
              }}
            />
          </div>
        </ComponentCard>
        
        <div className="flex gap-2 mt-2">
          <Button type="submit" isLoading={mutation.isPending || loading}>
            ثبت
          </Button>
          <Button variant="outline" onClick={() => formik.resetForm()}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContentAboutUs;
