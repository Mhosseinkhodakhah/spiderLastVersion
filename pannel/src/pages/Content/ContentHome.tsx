import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";
import { uploadFiles } from "../../server/uploadFiles";
import { getHomeData, homePage } from "../../server/content";
import Loading from "../../components/loading";
import { homeDataSchema } from "../../utils/validation";
import Input from "../../components/form/input/InputField";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

function ContentHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainFile, setMainFile] = useState<File[]>([]);
  const [middleFiles, setMiddleFiles] = useState<File[]>([]);
  const [firstBannerFile, setFirstBannerFile] = useState<File[]>([]);
  const [secondBannerFile, setSecondBannerFile] = useState<File[]>([]);

  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ["getHomeData"],
    queryFn: getHomeData,
  });

  const {
    mainImages,
    middleImages,
    peDescription,
    enDescription,
    ruDescription,
    peEventPartDescription,
    firstPeEventPartDescription,
    firstEnEventPartDescription,
    firstRuEventPartDescription,
    secondPeEventPartDescription,
    secondEnEventPartDescription,
    secondRuEventPartDescription,
    enEventPartDescription,
    ruEventPartDescription,
    peMiddleImageDescription,
    enMiddleImageDescription,
    ruMiddleImageDescription,
    peProjectDescription,
    enProjectDescription,
    ruProjectDescription,
    peAboutUsDescription,
    enAboutUsDescription,
    ruAboutUsDescription,
    peNgoDescription,
    enNgoDescription,
    ruNgoDescription,
    firstBannerImage,
    firstBannerLink,
    peFirstBannerDescription,
    enFirstBannerDescription,
    ruFirstBannerDescription,
    secondBannerImage,
    secondBannerLink,
    peSecondBannerDescription,
    enSecondBannerDescription,
    ruSecondBannerDescription,
    permitedToShowSecondBanner,
    ngoAlgo,
  } = data?.data?.home ?? {};

  console.log("afa", mainFile);

  const mutation = useMutation({
    mutationKey: ["homePage"],
    mutationFn: homePage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه اصلی با موفقیت تغییر کرد");
        setMainFile([]);
        setMiddleFiles([]);
      } else {
        toast.error("محتوای صفحه اصلی تغییر نکرد ، لطفا دوباره امتحان کنید");
      }
      setIsLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      mainImages: mainImages ? mainImages : [],
      middleImages: middleImages ? middleImages : [],
      peDescription: peDescription ? peDescription : "",
      enDescription: enDescription ? enDescription : "",
      ruDescription: ruDescription ? ruDescription : "",
      peEventPartDescription: peEventPartDescription ? peEventPartDescription : '',
      enEventPartDescription: enEventPartDescription ? enEventPartDescription : '',
      ruEventPartDescription: ruEventPartDescription ? ruEventPartDescription : '' ,
      firstPeEventPartDescription: firstPeEventPartDescription ? firstPeEventPartDescription : '',
      firstEnEventPartDescription: firstEnEventPartDescription ? firstEnEventPartDescription : '',
      firstRuEventPartDescription: firstRuEventPartDescription ? firstRuEventPartDescription : '' ,
      secondPeEventPartDescription: secondPeEventPartDescription ? secondPeEventPartDescription : '',
      secondEnEventPartDescription: secondEnEventPartDescription ? secondEnEventPartDescription : '',
      secondRuEventPartDescription: secondRuEventPartDescription ? secondRuEventPartDescription : '' ,
      peMiddleImageDescription: peMiddleImageDescription
        ? peMiddleImageDescription
        : " ",
      enMiddleImageDescription: enMiddleImageDescription
        ? enMiddleImageDescription
        : " ",
      ruMiddleImageDescription: ruMiddleImageDescription
        ? ruMiddleImageDescription
        : " ",
      peProjectDescription: peProjectDescription ? peProjectDescription : "",
      enProjectDescription: enProjectDescription ? enProjectDescription : "",
      ruProjectDescription: ruProjectDescription ? ruProjectDescription : "",
      peAboutUsDescription: peAboutUsDescription ? peAboutUsDescription : "",
      enAboutUsDescription: enAboutUsDescription ? enAboutUsDescription : "",
      ruAboutUsDescription: ruAboutUsDescription ? ruAboutUsDescription : "",
      peNgoDescription: peNgoDescription ? peNgoDescription : "",
      enNgoDescription: enNgoDescription ? enNgoDescription : "",
      ruNgoDescription: ruNgoDescription ? ruNgoDescription : "",
      firstBannerLink : firstBannerLink,
      secondBannerLink : firstBannerLink,
      firstBannerImage: firstBannerImage ? firstBannerImage : [],
      peFirstBannerDescription: peFirstBannerDescription
        ? peFirstBannerDescription
        : "",
      enFirstBannerDescription: enFirstBannerDescription
        ? enFirstBannerDescription
        : "",
      ruFirstBannerDescription: ruFirstBannerDescription
        ? ruFirstBannerDescription
        : "",
      secondBannerImage: secondBannerImage ? secondBannerImage : [],
      peSecondBannerDescription: peSecondBannerDescription
        ? peSecondBannerDescription
        : "",
      enSecondBannerDescription: enSecondBannerDescription
        ? enSecondBannerDescription
        : "",
      ruSecondBannerDescription: ruSecondBannerDescription
        ? ruSecondBannerDescription
        : "",
      permitedToShowSecondBanner: permitedToShowSecondBanner
        ? permitedToShowSecondBanner
        : false,
      ngoAlgo: ngoAlgo ? ngoAlgo : 0,
    },
    enableReinitialize: true,
    validationSchema: homeDataSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (
        mainFile.length > 0 ||
        middleFiles.length > 0 ||
        firstBannerFile.length > 0 ||
        secondBannerFile.length > 0
      ) {
        if (mainFile.length > 0) {
          const formData = new FormData();

          mainFile?.forEach((file) => {
            formData.append("picture", file);
          });

          const response = await uploadFiles(formData);

          if (response.success) {
            values.mainImages = values.mainImages.concat(response.data);
            toast.success("تصاویر اصلی آپلود شدند");
          } else {
            toast.error("تصاویر اصلی آپلود نشدند ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }

        if (middleFiles.length > 0) {
          const middleFormData = new FormData();

          middleFiles.forEach((file) => {
            middleFormData.append("picture", file);
          });

          const responseMiddle = await uploadFiles(middleFormData);

          if (responseMiddle.success) {
            values.middleImages = values.middleImages.concat(
              responseMiddle.data
            );
            toast.success("تصاویر میانی آپلود شدند");
          } else {
            toast.error("تصاویر میانی آپلود نشدند ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }

        if (firstBannerFile.length > 0) {
          const firstBannerFormData = new FormData();

          firstBannerFile.forEach((file) => {
            firstBannerFormData.append("picture", file);
          });

          const resFirstBanner = await uploadFiles(firstBannerFormData);

          if (resFirstBanner.success) {
            values.firstBannerImage = resFirstBanner.data;
            toast.success("تصویر بنر اول آپلود شد");
          } else {
            toast.error("تصویر بنر اول آپلود نشد ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }
        if (secondBannerFile.length > 0) {
          const secondBannerFormData = new FormData();

          secondBannerFile.forEach((file) => {
            secondBannerFormData.append("picture", file);
          });

          const resSecondBanner = await uploadFiles(secondBannerFormData);

          if (resSecondBanner.success) {
            values.secondBannerImage = resSecondBanner.data;
            toast.success("تصویر بنر دوم آپلود شد");
          } else {
            toast.error("تصویر بنر دوم آپلود نشد ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }

        mutation.mutate(values);
      } else {
        mutation.mutate(values);
      }
    },
  });

  if (isLoadingData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <PageMeta title="محتوا | خانه" description="محتوای صفحه اصلی سایت" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="خانه" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title='عکس های مربوط به اسلایدر عکس موجود در صفحه ی اصلی سایت' desc="">
        <DropzoneComponent
          title="تصویر اصلی"
          multiple
          onFiles={setMainFile}
          files={mainFile}
          formik={formik}
          formikImages={formik?.values?.mainImages}
          name="mainImages"
        />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="توضیحات تگ شده بر روی اسلایدر عکس صفحه اصلی سایت" desc="">
        <TextAreaInput
          title="توضیحات صفحه اصلی (فارسی)"
          formik={formik}
          name="peDescription"
          error={formik.errors.peDescription ? true : false}
          hint={
            typeof formik.errors.peDescription === "string"
              ? formik.errors.peDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات صفحه اصلی (انگلیسی)"
          formik={formik}
          name="enDescription"
          error={formik.errors.enDescription ? true : false}
          hint={
            typeof formik.errors.enDescription === "string"
              ? formik.errors.enDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات صفحه اصلی (روسی)"
          formik={formik}
          name="ruDescription"
          error={formik.errors.ruDescription ? true : false}
          hint={
            typeof formik.errors.ruDescription === "string"
              ? formik.errors.ruDescription
              : ""
          }
        />
      </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title='توضیحات مربوط به بخش اسلایدر رویداد ها' desc="">
          <div>
            <Label htmlFor="pe-input">توضیحات رویداد اول در صفحه خانه</Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد اول (فارسی) در صفحه خانه را وارد کنید"
              error={formik.errors.peEventPartDescription ? true : false}
              {...formik.getFieldProps("peEventPartDescription")}
            />
            {formik.errors.peEventPartDescription &&
              formik.touched.peEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.peEventPartDescription ===
                    "string" && formik.errors.peEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد اول (انگلیسی) در صفحه خانه را وارد کنید"
              error={formik.errors.enEventPartDescription ? true : false}
              {...formik.getFieldProps("enEventPartDescription")}
            />
            {formik.errors.enEventPartDescription &&
              formik.touched.enEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.enEventPartDescription ===
                    "string" && formik.errors.enEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد اول (روسی) در صفحه خانه را وارد کنید"
              error={formik.errors.ruEventPartDescription ? true : false}
              {...formik.getFieldProps("ruEventPartDescription")}
            />
            {formik.errors.ruEventPartDescription &&
              formik.touched.ruEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.ruEventPartDescription ===
                    "string" && formik.errors.ruEventPartDescription}
                </span>
              )}
          </div>

          <hr className="border-t border-black-200 dark:border-white-800 my-8" />
          <div>
            <Label htmlFor="pe-input">توضیحات رویداد دوم در صفحه خانه</Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد دوم (فارسی) در صفحه خانه را وارد کنید"
              error={formik.errors.firstPeEventPartDescription ? true : false}
              {...formik.getFieldProps("firstPeEventPartDescription")}
            />
            {formik.errors.firstPeEventPartDescription &&
              formik.touched.firstPeEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.firstPeEventPartDescription ===
                    "string" && formik.errors.firstPeEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد دوم (انگلیسی) در صفحه خانه را وارد کنید"
              error={formik.errors.firstEnEventPartDescription ? true : false}
              {...formik.getFieldProps("firstEnEventPartDescription")}
            />
            {formik.errors.firstEnEventPartDescription &&
              formik.touched.firstEnEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.firstEnEventPartDescription ===
                    "string" && formik.errors.firstEnEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد دوم (روسی) در صفحه خانه را وارد کنید"
              error={formik.errors.firstRuEventPartDescription ? true : false}
              {...formik.getFieldProps("firstRuEventPartDescription")}
            />
            {formik.errors.firstRuEventPartDescription &&
              formik.touched.firstRuEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.firstRuEventPartDescription ===
                    "string" && formik.errors.firstRuEventPartDescription}
                </span>
              )}
          </div>

            
          <hr className="border-t border-black-200 dark:border-white-800 my-8" />
          <div>
            <Label htmlFor="pe-input">توضیحات رویداد سوم در صفحه خانه</Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد سوم (فارسی) در صفحه خانه را وارد کنید"
              error={formik.errors.secondPeEventPartDescription ? true : false}
              {...formik.getFieldProps("secondPeEventPartDescription")}
            />
            {formik.errors.secondPeEventPartDescription &&
              formik.touched.secondPeEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.secondPeEventPartDescription ===
                    "string" && formik.errors.secondPeEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد سوم (انگلیسی) در صفحه خانه را وارد کنید"
              error={formik.errors.secondEnEventPartDescription ? true : false}
              {...formik.getFieldProps("secondEnEventPartDescription")}
            />
            {formik.errors.secondEnEventPartDescription &&
              formik.touched.secondEnEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.secondEnEventPartDescription ===
                    "string" && formik.errors.secondEnEventPartDescription}
                </span>
              )}
          </div>
          <div>
            <Input
              type="text"
              id="pe-input"
              placeholder="توضیحات رویداد سوم (روسی) در صفحه خانه را وارد کنید"
              error={formik.errors.secondRuEventPartDescription ? true : false}
              {...formik.getFieldProps("secondRuEventPartDescription")}
            />
            {formik.errors.secondRuEventPartDescription &&
              formik.touched.secondRuEventPartDescription && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.secondRuEventPartDescription ===
                    "string" && formik.errors.secondRuEventPartDescription}
                </span>
              )}
          </div>

        </ComponentCard>
        <ComponentCard title='توضیحات مربوط به بخش اسلایدر پروژه ها' desc="">
        <TextAreaInput
          title="توضیحات بخش پروژه ها (فارسی)"
          formik={formik}
          name="peProjectDescription"
          error={formik.errors.peProjectDescription ? true : false}
          hint={
            typeof formik.errors.peProjectDescription === "string"
              ? formik.errors.peProjectDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات بخش پروژه ها (انگلیسی)"
          formik={formik}
          name="enProjectDescription"
          error={formik.errors.enProjectDescription ? true : false}
          hint={
            typeof formik.errors.enProjectDescription === "string"
              ? formik.errors.enProjectDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات بخش پروژه ها (روسی)"
          formik={formik}
          name="ruProjectDescription"
          error={formik.errors.ruProjectDescription ? true : false}
          hint={
            typeof formik.errors.ruProjectDescription === "string"
              ? formik.errors.ruProjectDescription
              : ""
          }
        />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title='توضیحات مربوط به بخش درباره ما در صفحه اصلی سایت' desc="">
        <TextAreaInput
          title="توضیحات درباره ما (فارسی)"
          formik={formik}
          name="peAboutUsDescription"
          error={formik.errors.peAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.peAboutUsDescription === "string"
              ? formik.errors.peAboutUsDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات درباره ما (انگلیسی)"
          formik={formik}
          name="enAboutUsDescription"
          error={formik.errors.enAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.enAboutUsDescription === "string"
              ? formik.errors.enAboutUsDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات درباره ما (روسی)"
          formik={formik}
          name="ruAboutUsDescription"
          error={formik.errors.ruAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.ruAboutUsDescription === "string"
              ? formik.errors.ruAboutUsDescription
              : ""
          }
        />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="توضیحات مربوط به بخش اسلایدر سمن ها" desc="">
        <TextAreaInput
          title="توضیحات سمن ها (فارسی)"
          formik={formik}
          name="peNgoDescription"
          error={formik.errors.peNgoDescription ? true : false}
          hint={
            typeof formik.errors.peNgoDescription === "string"
              ? formik.errors.peNgoDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات سمن ها (انگلیسی)"
          formik={formik}
          name="enNgoDescription"
          error={formik.errors.enNgoDescription ? true : false}
          hint={
            typeof formik.errors.enNgoDescription === "string"
              ? formik.errors.enNgoDescription
              : ""
          }
        />

        <TextAreaInput
          title="توضیحات سمن ها (روسی)"
          formik={formik}
          name="ruNgoDescription"
          error={formik.errors.ruNgoDescription ? true : false}
          hint={
            typeof formik.errors.ruNgoDescription === "string"
              ? formik.errors.ruNgoDescription
              : ""
          }
        />
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="اطلاعات بنر اول در صفحه اصلی سایت">
          <DropzoneComponent
            title="تصویر بنر اول"
            multiple={false}
            onFiles={setFirstBannerFile}
            formik={formik}
            formikImages={formik?.values?.firstBannerImage}
            name="firstBannerImage"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="pe-input">متن بنر فارسی</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="متن فارسی بنر را وارد کنید"
                error={formik.errors.peFirstBannerDescription ? true : false}
                {...formik.getFieldProps("peFirstBannerDescription")}
              />
              {formik.errors.peFirstBannerDescription &&
                formik.touched.peFirstBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.peFirstBannerDescription ===
                      "string" && formik.errors.peFirstBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="en-input">متن انگلیسی بنر</Label>
              <Input
                type="text"
                id="en-input"
                placeholder="متن انگلیسی بنر را وارد کنید"
                error={formik.errors.enFirstBannerDescription ? true : false}
                {...formik.getFieldProps("enFirstBannerDescription")}
              />
              {formik.errors.enFirstBannerDescription &&
                formik.touched.enFirstBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.enFirstBannerDescription ===
                      "string" && formik.errors.enFirstBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input">متن روسی بنر</Label>
              <Input
                type="text"
                id="ru-input"
                placeholder="متن روسی بنر را وارد کنید"
                error={formik.errors.ruFirstBannerDescription ? true : false}
                {...formik.getFieldProps("ruFirstBannerDescription")}
              />
              {formik.errors.ruFirstBannerDescription &&
                formik.touched.ruFirstBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.ruFirstBannerDescription ===
                      "string" && formik.errors.ruFirstBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-link">لینک بنر</Label>
              <Input
                type="text"
                id="ru-link"
                
                placeholder="لینک انتقال دهنده روی بنر"
                error={formik.errors.firstBannerLink ? true : false}
                {...formik.getFieldProps("firstBannerLink")}
              />
              {formik.errors.firstBannerLink &&
                formik.touched.firstBannerLink && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.firstBannerLink ===
                      "string" && formik.errors.firstBannerLink}
                  </span>
                )}
            </div>
          </div>
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="اطلاعات مربوط به بنر دوم در صفحه اصلی سایت">
          <DropzoneComponent
            title="تصویر بنر دوم"
            multiple={false}
            onFiles={setSecondBannerFile}
            files={secondBannerFile}
            formik={formik}
            formikImages={formik?.values?.secondBannerImage}
            name="secondBannerImage"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="pe-input">متن بنر فارسی دوم</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="متن فارسی بنر دوم را وارد کنید"
                error={formik.errors.peSecondBannerDescription ? true : false}
                {...formik.getFieldProps("peSecondBannerDescription")}
              />
              {formik.errors.peSecondBannerDescription &&
                formik.touched.peSecondBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.peSecondBannerDescription ===
                      "string" && formik.errors.peSecondBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="en-input">متن انگلیسی بنر دوم</Label>
              <Input
                type="text"
                id="en-input"
                placeholder="متن انگلیسی بنر دوم را وارد کنید"
                error={formik.errors.enSecondBannerDescription ? true : false}
                {...formik.getFieldProps("enSecondBannerDescription")}
              />
              {formik.errors.enSecondBannerDescription &&
                formik.touched.enSecondBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.enSecondBannerDescription ===
                      "string" && formik.errors.enSecondBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input">متن روسی بنر دوم</Label>
              <Input
                type="text"
                id="ru-input"
                placeholder="متن روسی بنر دوم را وارد کنید"
                error={formik.errors.ruSecondBannerDescription ? true : false}
                {...formik.getFieldProps("ruSecondBannerDescription")}
              />
              {formik.errors.ruSecondBannerDescription &&
                formik.touched.ruSecondBannerDescription && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.ruSecondBannerDescription ===
                      "string" && formik.errors.ruSecondBannerDescription}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-link">لینک بنر</Label>
              <Input
                type="text"
                id="ru-link"
                placeholder="لینک انتقال دهنده روی بنر"
                error={formik.errors.secondBannerLink ? true : false}
                {...formik.getFieldProps("secondBannerLink")}
              />
              {formik.errors.secondBannerLink &&
                formik.touched.secondBannerLink && (
                  <span className="text-sm text-error-500">
                    {typeof formik.errors.secondBannerLink ===
                      "string" && formik.errors.secondBannerLink}
                  </span>
                )}
            </div>
            <div className="mt-4 p-5">
              <Checkbox
                label="نمایش بنر دوم"
                checked={formik.values.permitedToShowSecondBanner}
                onChange={() => {
                  formik.setFieldValue(
                    "permitedToShowSecondBanner",
                    !formik.values.permitedToShowSecondBanner
                  );
                }}
              />
            </div>
          </div>
        </ComponentCard>
        <hr className="border-t border-black-200 dark:border-white-800 my-8" />
        <ComponentCard title="مشخص کردن ترتیب نمایش سمن ها در اسلایدر سمن ها در صفحه اصلی سایت">
          <div className="mt-4 flex flex-col gap-2">
            <Checkbox
              label="پر بازدید ترین"
              checked={formik.values.ngoAlgo === 0}
              onChange={() => {
                formik.setFieldValue("ngoAlgo", 0);
              }}
            />
            <Checkbox
              label="جدیدترین"
              checked={formik.values.ngoAlgo === 1}
              onChange={() => {
                formik.setFieldValue("ngoAlgo", 1);
              }}
            />
            <Checkbox
              label="بیشترین همکاری"
              checked={formik.values.ngoAlgo === 2}
              onChange={() => {
                formik.setFieldValue("ngoAlgo", 2);
              }}
            />
          </div>
        </ComponentCard>

        <div className="flex gap-2 mt-2">
          <Button type="submit" isLoading={mutation.isPending || isLoading}>
            ثبت
          </Button>
          <Button variant="outline" onClick={() =>{ 
            console.log('hjello')
            formik.resetForm()}}>انصراف</Button>
        </div>
      </form>
    </div>
  );
}

export default ContentHome;
