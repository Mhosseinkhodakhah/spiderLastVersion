import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

function Confirm({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  message?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center h-min ">
        <h2 className="font-bold text-2xl mb-4">مطمئن هستید؟</h2>
        <p>{message ? message : "آیا میخواهید حذف کنید"}</p>
        <div className="flex gap-4 my-4">
          <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
            تایید
          </Button>
          <Button variant="outline" onClick={onClose}>
            انصراف
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
