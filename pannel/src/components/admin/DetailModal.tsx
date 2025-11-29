import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function DetailModal({ isOpen, onClose, data }: Props) {
  console.log("iiiiii", data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold">جزئیات گزارش</h2>

      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">نام ادمین :</span>
        <span>{data?.user?.name}</span>
      </div>
      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">نام کاربری :</span>
        <span>{data?.user?.userName}</span>
      </div>
      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">عنوان اقدام :</span>
        <span>{data?.action?.title}</span>
      </div>
      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">تاریخ اقدام :</span>
        <span>{data?.action?.date}</span>
      </div>
      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">ساعت اقدام :</span>
        <span>{data?.action?.time}</span>
      </div>

      <h2 className="text-lg m-4 font-bold">توضیحات اقدام</h2>

      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">نام اقدام :</span>
        <span>{data?.action?.description?.name}</span>
      </div>
      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">وضعیت پذیرش :</span>
        {data?.action?.description?.accepted ? (
          <span className="bg-green-500 text-white rounded-full p-1 px-3">
            پذیرفته شده
          </span>
        ) : (
          <span className="bg-rose-500 text-white rounded-full p-1 px-3">
            پذیرفته نشده
          </span>
        )}
      </div>

      <div className="my-4 border-b py-2 px-4">
        <span className="mx-2">وضعیت اقدام :</span>
        <span>{data?.action?.description?.status}</span>
      </div>

      <div>
        <Button onClick={onClose}>بستن</Button>
      </div>
    </Modal>
  );
}

export default DetailModal;
