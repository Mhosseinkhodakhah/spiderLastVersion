import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/form-elements/DropZone";
import Button from "../ui/button/Button";
import TextEditor from "../common/TextEditor";
// import useTemplateOne from "../../hooks/useTemplateOne";

function TemplateOne({
  formik,
  contentFormik,
  formikTemplateSubContent,
  formikTemplateSecondPage,
  onStep,
  onFile,
  isLoading,
  step,
}: {
  formik: any;
  contentFormik: any;
  formikTemplateSubContent: any;
  formikTemplateSecondPage: any;
  onStep: (step: number) => void;
  onFile: (image: File[]) => void;
  isLoading: boolean;
  step: number; // Explicitly ensure step is typed as a number
}) {
  return (
    <>
      {step === 3 ? (
        <>
          <ComponentCard title="تصویر صفحه">
            <DropzoneComponent
              multiple={false}
              title="تصویر صفحه"
              onFiles={onFile}
              formikImages={contentFormik.values.image}
            />
          </ComponentCard>
          <ComponentCard title="عنوان صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={contentFormik.errors.peTitle ? true : false}
                  {...contentFormik.getFieldProps("peTitle")}
                />
                {contentFormik.errors.peTitle &&
                  contentFormik.touched.peTitle && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.peTitle === "string" &&
                        contentFormik.errors.peTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={contentFormik.errors.enTitle ? true : false}
                  {...contentFormik.getFieldProps("enTitle")}
                />
                {contentFormik.errors.enTitle &&
                  contentFormik.touched.enTitle && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.enTitle === "string" &&
                        contentFormik.errors.enTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={contentFormik.errors.ruTitle ? true : false}
                  {...contentFormik.getFieldProps("ruTitle")}
                />
                {contentFormik.errors.ruTitle &&
                  contentFormik.touched.ruTitle && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.ruTitle === "string" &&
                        contentFormik.errors.ruTitle}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">توضیحات فارسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="peDescription"
                  placeholder="توضیحات فارسی را وارد کنید"
                  error={contentFormik.errors.peDescription ? true : false}
                />
                {contentFormik.errors.peDescription &&
                  contentFormik.touched.peDescription && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.peDescription === "string" &&
                        contentFormik.errors.peDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">توضیحات انگلیسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="enDescription"
                  placeholder="توضیحات انگلیسی را وارد کنید"
                  error={contentFormik.errors.enDescription ? true : false}
                />
                {contentFormik.errors.enDescription &&
                  contentFormik.touched.enDescription && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.enDescription === "string" &&
                        contentFormik.errors.enDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">توضیحات روسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="ruDescription"
                  placeholder="توضیحات روسی را وارد کنید"
                  error={contentFormik.errors.ruDescription ? true : false}
                />
                {contentFormik.errors.ruDescription &&
                  contentFormik.touched.ruDescription && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.ruDescription === "string" &&
                        contentFormik.errors.ruDescription}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="محتوای صفحه" className="mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <TextEditor
                  title="محتوای فارسی"
                  formik={formik}
                  name="peContent"
                  lang="fa"
                />
                {/* <Label htmlFor="pe-input">محتوای فارسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="peContent"
                  placeholder="محتوای فارسی را وارد کنید"
                  error={contentFormik.errors.peContent ? true : false}
                /> */}
                {contentFormik.errors.peContent &&
                  contentFormik.touched.peContent && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.peContent === "string" &&
                        contentFormik.errors.peContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای انگلیسی"
                  formik={formik}
                  name="enContent"
                  lang="en"
                />
                {/* <Label htmlFor="en-input">محتوای انگلیسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="enContent"
                  placeholder="محتوای انگلیسی را وارد کنید"
                  error={contentFormik.errors.enContent ? true : false}
                /> */}
                {contentFormik.errors.enContent &&
                  contentFormik.touched.enContent && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.enContent === "string" &&
                        contentFormik.errors.enContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای روسی"
                  formik={formik}
                  name="ruContent"
                  lang="en"
                />
                {/* <Label htmlFor="ru-input">محتوای روسی</Label>
                <TextArea
                  formik={contentFormik}
                  name="ruContent"
                  placeholder="محتوای روسی را وارد کنید"
                  error={contentFormik.errors.ruContent ? true : false}
                /> */}
                {contentFormik.errors.ruContent &&
                  contentFormik.touched.ruContent && (
                    <span className="text-sm text-error-500">
                      {typeof contentFormik.errors.ruContent === "string" &&
                        contentFormik.errors.ruContent}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <div className="mt-4 flex gap-2">
            <Button
              type={formik?.values?.hasSubPage ? "button" : "submit"}
              onClick={() => {
                if (formik?.values?.hasSubPage) {
                  onStep(step + 1);
                }
              }}
              isLoading={isLoading}
            >
              {formik?.values?.hasSubPage ? "بعدی" : "تایید و ساخت صفحه"}
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
      ) : step === 5 ? (
        <>
          <ComponentCard title="تصویر صفحه">
            <DropzoneComponent
              multiple={false}
              title="تصویر صفحه"
              onFiles={onFile}
              formikImages={formikTemplateSubContent.values.image}
            />
          </ComponentCard>
          <ComponentCard title="عنوان صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors?.peTitle ? true : false
                  }
                  {...formikTemplateSubContent.getFieldProps("peTitle")}
                />
                {formikTemplateSubContent.errors &&
                  formikTemplateSubContent.touched && (
                    <span className="text-sm text-error-500">
                      {formikTemplateSubContent.errors.peTitle === "string" &&
                        formikTemplateSubContent.errors.peTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formikTemplateSubContent.errors.enTitle ? true : false}
                  {...formikTemplateSubContent.getFieldProps("enTitle")}
                />
                {formikTemplateSubContent.errors.enTitle &&
                  formikTemplateSubContent.touched.enTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.enTitle ===
                        "string" && formikTemplateSubContent.errors.enTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formikTemplateSubContent.errors.ruTitle ? true : false}
                  {...formikTemplateSubContent.getFieldProps("ruTitle")}
                />
                {formikTemplateSubContent.errors.ruTitle &&
                  formikTemplateSubContent.touched.ruTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.ruTitle ===
                        "string" && formikTemplateSubContent.errors.ruTitle}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">توضیحات فارسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="peDescription"
                  placeholder="توضیحات فارسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.peDescription ? true : false
                  }
                />
                {formikTemplateSubContent.errors.peDescription &&
                  formikTemplateSubContent.touched.peDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.peDescription ===
                        "string" &&
                        formikTemplateSubContent.errors.peDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">توضیحات انگلیسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="enDescription"
                  placeholder="توضیحات انگلیسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.enDescription ? true : false
                  }
                />
                {formikTemplateSubContent.errors.enDescription &&
                  formikTemplateSubContent.touched.enDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.enDescription ===
                        "string" &&
                        formikTemplateSubContent.errors.enDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">توضیحات روسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="ruDescription"
                  placeholder="توضیحات روسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.ruDescription ? true : false
                  }
                />
                {formikTemplateSubContent.errors.ruDescription &&
                  formikTemplateSubContent.touched.ruDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.ruDescription ===
                        "string" &&
                        formikTemplateSubContent.errors.ruDescription}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="محتوای صفحه" className="mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <TextEditor
                  title="محتوای فارسی"
                  formik={formik}
                  name="peContent"
                  lang="fa"
                />
                {/* <Label htmlFor="pe-input">محتوای فارسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="peContent"
                  placeholder="محتوای فارسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.peContent ? true : false
                  }
                /> */}
                {formikTemplateSubContent.errors.peContent &&
                  formikTemplateSubContent.touched.peContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.peContent ===
                        "string" && formikTemplateSubContent.errors.peContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای انگلیسی"
                  formik={formik}
                  name="enContent"
                  lang="en"
                />
                {/* <Label htmlFor="en-input">محتوای انگلیسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="enContent"
                  placeholder="محتوای انگلیسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.enContent ? true : false
                  }
                /> */}
                {formikTemplateSubContent.errors.enContent &&
                  formikTemplateSubContent.touched.enContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.enContent ===
                        "string" && formikTemplateSubContent.errors.enContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای روسی"
                  formik={formik}
                  name="ruContent"
                  lang="en"
                />
                {/* <Label htmlFor="ru-input">محتوای روسی</Label>
                <TextArea
                  formik={formikTemplateSubContent}
                  name="ruContent"
                  placeholder="محتوای روسی را وارد کنید"
                  error={
                    formikTemplateSubContent.errors.ruContent ? true : false
                  }
                /> */}
                {formikTemplateSubContent.errors.ruContent &&
                  formikTemplateSubContent.touched.ruContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSubContent.errors.ruContent ===
                        "string" && formikTemplateSubContent.errors.ruContent}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <div className="mt-4 flex gap-2">
            <Button
              type={formik?.values?.hasSecondSubPage ? "button" : "submit"}
              onClick={() => {
                if (formik?.values?.hasSecondSubPage) {
                  onStep(step + 1);
                }
              }}
              isLoading={isLoading}
            >
              {formik?.values?.hasSecondSubPage ? "بعدی" : "تایید و ساخت صفحه"}
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
      ) : step === 7 ? (
        <>
          <ComponentCard title="تصویر صفحه">
            <DropzoneComponent
              multiple={false}
              title="تصویر صفحه"
              onFiles={onFile}
              formikImages={formikTemplateSecondPage.values.image}
            />
          </ComponentCard>
          <ComponentCard title="عنوان صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors?.peTitle ? true : false
                  }
                  {...formikTemplateSecondPage.getFieldProps("peTitle")}
                />
                {formikTemplateSecondPage.errors &&
                  formikTemplateSecondPage.touched && (
                    <span className="text-sm text-error-500">
                      {formikTemplateSecondPage.errors.peTitle === "string" &&
                        formikTemplateSecondPage.errors.peTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formikTemplateSecondPage.errors.enTitle ? true : false}
                  {...formikTemplateSecondPage.getFieldProps("enTitle")}
                />
                {formikTemplateSecondPage.errors.enTitle &&
                  formikTemplateSecondPage.touched.enTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.enTitle ===
                        "string" && formikTemplateSecondPage.errors.enTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formikTemplateSecondPage.errors.ruTitle ? true : false}
                  {...formikTemplateSecondPage.getFieldProps("ruTitle")}
                />
                {formikTemplateSecondPage.errors.ruTitle &&
                  formikTemplateSecondPage.touched.ruTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.ruTitle ===
                        "string" && formikTemplateSecondPage.errors.ruTitle}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات صفحه" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="pe-input">توضیحات فارسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="peDescription"
                  placeholder="توضیحات فارسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.peDescription ? true : false
                  }
                />
                {formikTemplateSecondPage.errors.peDescription &&
                  formikTemplateSecondPage.touched.peDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.peDescription ===
                        "string" &&
                        formikTemplateSecondPage.errors.peDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">توضیحات انگلیسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="enDescription"
                  placeholder="توضیحات انگلیسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.enDescription ? true : false
                  }
                />
                {formikTemplateSecondPage.errors.enDescription &&
                  formikTemplateSecondPage.touched.enDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.enDescription ===
                        "string" &&
                        formikTemplateSecondPage.errors.enDescription}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">توضیحات روسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="ruDescription"
                  placeholder="توضیحات روسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.ruDescription ? true : false
                  }
                />
                {formikTemplateSecondPage.errors.ruDescription &&
                  formikTemplateSecondPage.touched.ruDescription && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.ruDescription ===
                        "string" &&
                        formikTemplateSecondPage.errors.ruDescription}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="محتوای صفحه" className="mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <TextEditor
                  title="محتوای فارسی"
                  formik={formik}
                  name="peContent"
                  lang="fa"
                />
                {/* <Label htmlFor="pe-input">محتوای فارسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="peContent"
                  placeholder="محتوای فارسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.peContent ? true : false
                  }
                /> */}
                {formikTemplateSecondPage.errors.peContent &&
                  formikTemplateSecondPage.touched.peContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.peContent ===
                        "string" && formikTemplateSecondPage.errors.peContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای انگلیسی"
                  formik={formik}
                  name="enContent"
                  lang="en"
                />
                {/* <Label htmlFor="en-input">محتوای انگلیسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="enContent"
                  placeholder="محتوای انگلیسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.enContent ? true : false
                  }
                /> */}
                {formikTemplateSecondPage.errors.enContent &&
                  formikTemplateSecondPage.touched.enContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.enContent ===
                        "string" && formikTemplateSecondPage.errors.enContent}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <TextEditor
                  title="محتوای روسی"
                  formik={formik}
                  name="ruContent"
                  lang="en"
                />
                {/* <Label htmlFor="ru-input">محتوای روسی</Label>
                <TextArea
                  formik={formikTemplateSecondPage}
                  name="ruContent"
                  placeholder="محتوای روسی را وارد کنید"
                  error={
                    formikTemplateSecondPage.errors.ruContent ? true : false
                  }
                /> */}
                {formikTemplateSecondPage.errors.ruContent &&
                  formikTemplateSecondPage.touched.ruContent && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateSecondPage.errors.ruContent ===
                        "string" && formikTemplateSecondPage.errors.ruContent}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <div className="mt-4 flex gap-2">
            <Button
              type={step !== 7 ? "button" : "submit"}
              onClick={() => {
                if (step !== 7) {
                  onStep(step + 1);
                }
              }}
              isLoading={isLoading}
            >
              {step !== 7 ? "بعدی" : "تایید و ساخت صفحه"}
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
      ) : (
        false
      )}
    </>
  );
}

export default TemplateOne;
