import { useDropzone } from "react-dropzone";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { TrashBinIcon } from "../../icons";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formik: any;
  update: any;
  id: number;
}

function ImageModal({ isOpen, onClose, formik, update, id }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  console.log('its a data' , id , update)
  useEffect(() => {
    if (id !== 0 && update.content) {
      setSelectedFiles(update.content);
    }
  }, [id]);

  const onDrop = (acceptedFiles: File[]) => {
    // let makingFile : any = []
    // acceptedFiles.forEach((elem : File)=>{
    //   makingFile.push(URL.createObjectURL(elem))
    // })
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: true,
    maxFiles: 5,
  });

  const handleSubmit = () => {
    // setFiles([...files, ...selectedFiles]);
    // setPreviewImage([...previewImage, ...previewFiles]);

    if (id) {
      const cpItem = [...formik.values.peContent];
      const index = cpItem.findIndex((item) => item._id === id);
      if (index !== -1) {
        cpItem[index] = {
          ...cpItem[index],
          content: selectedFiles,
        };
        formik.setFieldValue("peContent", cpItem);
        formik.setFieldValue("enContent", cpItem);
        formik.setFieldValue("ruContent", cpItem);
      }
    } else {
      formik.setFieldValue("peContent", [
        ...formik.values.peContent,
        {
          id: Math.random() * 10000,
          title: "images",
          content: selectedFiles,
        },
      ]);
      formik.setFieldValue("enContent", [
        ...formik.values.enContent,
        {
          id: Math.random() * 10000,
          title: "images",
          content: selectedFiles,
        },
      ]);
      formik.setFieldValue("ruContent", [
        ...formik.values.ruContent,
        {
          id: Math.random() * 10000,
          title: "images",
          content: selectedFiles,
        },
      ]);
      console.log("selected", selectedFiles);
    }

    setSelectedFiles([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div
        {...getRootProps()}
        className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
        id="demo-upload"
      >
        {/* Hidden Input */}
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0">
          {/* Icon Container */}
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            {isDragActive
              ? "اینجا رها کنید"
              : "تصویر را بکشید و اینجا رها کنید"}
          </h4>

          <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
            تصاویر PNG, JPG, WebP, SVG خود را اینجا بکشید و رها کنید و یا انتخاب
            کنید
          </span>
          <span className="bg-red-300 rounded-xl p-1 text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              برای آپلود بهتر عکس ها حداکثر حجم فایل ها مجموعا 
              5MB
              باشد
          </span>

          <span className="font-medium underline text-theme-sm text-brand-500">
            انتخاب تصویر
          </span>
        </div>
      </div>

      {selectedFiles?.length > 0 && <hr className="my-5" />}

      {selectedFiles?.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-5 pt-5">
          {selectedFiles.map((image, index) => (
            <div className="relative" key={index}>
              <div className="absolute top-2 right-2">
                <Button
                  className="bg-red-500 hover:bg-red-800"
                  startIcon={<TrashBinIcon />}
                  size="sm"
                  onClick={() => {
                    if (id) {
                      const cpItem: any = [...formik.values.peContent];

                      const filterItem = update.content?.filter(
                        (item: any, i: number) => index !== i
                      );

                      cpItem.content = filterItem;

                      setSelectedFiles(filterItem);
                    } else {
                      const cpItem: any = [...formik.values.peContent];
                      cpItem.content = cpItem.content.filter(
                        (item: any, i: number) => index !== i
                      );
                      formik.setFieldValue("peContent", cpItem);
                      formik.setFieldValue("enContent", cpItem);
                      formik.setFieldValue("ruContent", cpItem);
                    }
                  }}
                >
                  حذف
                </Button>
              </div>
          
              <img
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="mb-2 rounded-lg border border-gray-300"
              />
            </div>
          ))}
        </div>
      )}

      {selectedFiles?.length > 0 && (
        <div>
          <Button onClick={handleSubmit}>ذخیره</Button>
        </div>
      )}
    </Modal>
  );
}

export default ImageModal;
