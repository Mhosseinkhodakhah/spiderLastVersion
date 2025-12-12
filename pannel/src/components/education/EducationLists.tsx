import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { UpdateIcon, PlusIcon, TrashBinIcon } from "../../icons";
import toast from "react-hot-toast";
import Confirm from "../confirm";
import { Divider } from "@heroui/divider";
import { getSettings } from "../../server/events";
import { Modal } from "../ui/modal";

// Spider Bot Settings Interface
interface ISpiderSetting {
  _id: string;
  volume: string; // default: '10'
  percent: number; // default: 5
  active: boolean; // default: true
  currencies: string[]; // array of currency codes
  name?: string; // Setting name for identification
  description?: string; // Optional description
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

function SpiderSettingsPage() {
  const queryClient = useQueryClient();
  const [isOpenConfirm, setIsOpenConfirm] = useState<string | false>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSettingId, setCurrentSettingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ISpiderSetting>>({
    volume: '10',
    percent: 5,
    active: true,
    currencies: [],
  });
  const [currenciesInput, setCurrenciesInput] = useState("");

  // Fetch spider bot settings
  const { data, isLoading, error } = useQuery({
    queryKey: ["spiderSettings"],
    queryFn: getSettings,
  });

  console.log('data' , data)

  // Update settings mutation
  // const updateMutation = useMutation({
  //   mutationKey: ["updateSpiderSetting"],
  //   mutationFn: updateSpiderSetting,
  //   onSuccess: (response: any) => {
  //     if (response.success) {
  //       toast.success("تنظیمات با موفقیت به‌روزرسانی شد");
  //       queryClient.invalidateQueries({ queryKey: ["spiderSettings"] });
  //       resetForm();
  //     } else {
  //       toast.error("خطا در به‌روزرسانی تنظیمات");
  //     }
  //   },
  //   onError: () => {
  //     toast.error("خطا در ارتباط با سرور");
  //   },
  // });

  // Create settings mutation
  // const createMutation = useMutation({
  //   mutationKey: ["createSpiderSetting"],
  //   mutationFn: createSpiderSetting,
  //   onSuccess: (response: any) => {
  //     if (response.success) {
  //       toast.success("تنظیمات جدید با موفقیت ایجاد شد");
  //       queryClient.invalidateQueries({ queryKey: ["spiderSettings"] });
  //       resetForm();
  //       setIsOpenModal(false);
  //     } else {
  //       toast.error("خطا در ایجاد تنظیمات");
  //     }
  //   },
  //   onError: () => {
  //     toast.error("خطا در ارتباط با سرور");
  //   },
  // });

  // Delete settings mutation
  // const deleteMutation = useMutation({
  //   mutationKey: ["deleteSpiderSetting"],
  //   mutationFn: deleteSpiderSetting,
  //   onSuccess: (response: any) => {
  //     if (response.success) {
  //       toast.success("تنظیمات با موفقیت حذف شد");
  //       queryClient.invalidateQueries({ queryKey: ["spiderSettings"] });
  //       setIsOpenConfirm(false);
  //     } else {
  //       toast.error("خطا در حذف تنظیمات");
  //       setIsOpenConfirm(false);
  //     }
  //   },
  //   onError: () => {
  //     toast.error("خطا در ارتباط با سرور");
  //     setIsOpenConfirm(false);
  //   },
  // });

  const handleInputChange = (field: keyof ISpiderSetting, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrenciesInputChange = (value: string) => {
    setCurrenciesInput(value);
    const currenciesArray = value
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length > 0);
    handleInputChange("currencies", currenciesArray);
  };

  const handleSubmit = () => {
    if (isEditMode && currentSettingId) {
      console.log('adsf')
      // updateMutation.mutate({ id: currentSettingId, ...formData });
    } else {
      console.log('asdf')
      // createMutation.mutate(formData);
    }
  };

  const handleOpenModalForEdit = (setting: ISpiderSetting) => {
    setIsEditMode(true);
    setCurrentSettingId(setting._id);
    setFormData({
      volume: setting.volume,
      percent: setting.percent,
      active: setting.active,
      currencies: setting.currencies,
      name: setting.name || "",
      description: setting.description || "",
    });
    setCurrenciesInput(setting.currencies.join(", "));
    setIsOpenModal(true);
  };

  const handleOpenModalForCreate = () => {
    setIsEditMode(false);
    setCurrentSettingId(null);
    resetForm();
    setIsOpenModal(true);
  };

  const handleDeleteSetting = (id: string) => {
    setCurrentSettingId(id);
    setIsOpenConfirm(id);
  };

  const resetForm = () => {
    setFormData({
      volume: '10',
      percent: 5,
      active: true,
      currencies: [],
      name: "",
      description: "",
    });
    setCurrenciesInput("");
  };

  // Load existing settings on first load
  useEffect(() => {
    if (data?.data?.length > 0) {
      // If we have existing settings, show them
      console.log("Existing settings loaded:", data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-400">در حال بارگذاری تنظیمات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">خطا در بارگذاری تنظیمات</div>
      </div>
    );
  }

  const settings: ISpiderSetting[] = [data?.data];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-2xl p-6 border-2 backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="flex items-center gap-3">
                {/* <SettingsIcon className="w-8 h-8 text-blue-400" /> */}
                <h2 className="text-2xl font-bold text-white">
                  تنظیمات Spider Bot
                </h2>
              </div>
              <p className="text-gray-300 mt-2">
                مدیریت پیکربندی سیستم ترید خودکار
              </p>
            </div>

            <Button
              variant="primary"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              startIcon={<PlusIcon />}
              onClick={handleOpenModalForCreate}
            >
              ایجاد تنظیمات جدید
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      {settings.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl p-12 border-2 backdrop-blur-sm bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50 text-center">
          {/* <SettingsIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" /> */}
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            تنظیماتی یافت نشد
          </h3>
          <p className="text-gray-500 mb-6">
            برای شروع، تنظیمات جدیدی ایجاد کنید
          </p>
          <Button
            variant="primary"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            startIcon={<PlusIcon />}
            onClick={handleOpenModalForCreate}
          >
            ایجاد اولین تنظیمات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.map((setting) => (
            <div
              key={setting._id}
              className={`relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                setting.active
                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                  : "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50"
              }`}
            >
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    setting.active ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <span
                  className={`text-xs font-semibold ${
                    setting.active ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {setting.active ? "فعال" : "غیرفعال"}
                </span>
              </div>

              <Divider className="my-4" />

              {/* Settings Details */}
              <div className="space-y-3 ">
                <div className="flex  justify-between items-center">
                  <span className="text-white font-bold text-xl">حجم معامله :</span>
                  <span className="text-white font-bold text-xl bg-blue-500/20 px-3 py-1 rounded-full">
                    {setting.volume}$
                  </span>
                </div>

                <div className="flex  justify-between items-center">
                  <span className="text-white font-bold text-xl">درصد مجاز برای ورود:</span>
                  <span className="text-white font-bold text-xl bg-blue-500/20 px-3 py-1 rounded-full">
                    {setting.percent}%
                  </span>
                </div>

                <div className="flex  justify-between items-center">
                  <span className="text-white font-bold text-xl">تعداد ارزهای تحت نظر:</span>
                  <span className="text-white font-bold text-xl bg-blue-500/20 px-3 py-1 rounded-full">
                    {setting.currencies.length}
                  </span>
                </div>

                {setting.currencies.length > 0 && (
                  <div className="mt-3">
                    <span className="text-gray-400 text-sm block mb-2">ارزها:</span>
                    <div className="flex flex-wrap gap-2">
                      {setting.currencies.slice(0, 3).map((currency, idx) => (
                        <span
                          key={idx}
                          className="text-xl font-bold bg-gray-800/50 text-white px-2 py-1 rounded"
                        >
                          {currency}
                        </span>
                      ))}
                      {setting.currencies.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{setting.currencies.length - 3} بیشتر
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Divider className="my-4" />

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="primary"
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
                  startIcon={<UpdateIcon />}
                  size="sm"
                  onClick={() => handleOpenModalForEdit(setting)}
                >
                  ویرایش
                </Button>
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
                  startIcon={<TrashBinIcon />}
                  size="sm"
                  onClick={() => handleDeleteSetting(setting._id)}
                >
                  حذف
                </Button>
              </div>

              {/* Timestamps */}
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex justify-between  text-sm text-white">
                  <span>تاریخ ایجاد:</span>
                  <span>
                    {new Date(setting.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <Divider className="py-2 mt-2" />
                <div className="flex justify-between text-sm white">
                  <span>تاریخ آپدیت:</span>
                  <span>
                    {new Date(setting.updatedAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          resetForm();
        }}
        // title={isEditMode ? "ویرایش تنظیمات" : "ایجاد تنظیمات جدید"}
        // size="lg"
      >
        <div className="space-y-6 p-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام تنظیمات (اختیاری)
            </label>
            <Input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="مثال: تنظیمات ربات اصلی"
              className="w-full"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              توضیحات (اختیاری)
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="توضیحات درباره این تنظیمات..."
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Volume Field */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              حجم (Volume)
            </label>
            <Input
              type="text"
              value={formData.volume || ""}
              onChange={(e) => handleInputChange("volume", e.target.value)}
              placeholder="مقدار حجم را وارد کنید"
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-400">
              مقدار پیش‌فرض: 10
            </p>
          </div>

          {/* Percent Field */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              درصد (Percent)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.percent || ""}
              onChange={(e) =>
                handleInputChange("percent", parseInt(e.target.value) || 0)
              }
              placeholder="درصد را وارد کنید"
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-400">
              مقدار پیش‌فرض: 5
            </p>
          </div>

          {/* Active Toggle */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  وضعیت فعال
                </label>
                <p className="text-sm text-gray-400">
                  این تنظیمات فعال باشد؟
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active || false}
                  onChange={(e) => handleInputChange("active", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Currencies Field */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ارزها (Currencies)
            </label>
            <textarea
              value={currenciesInput}
              onChange={(e) => handleCurrenciesInputChange(e.target.value)}
              placeholder="نام ارزها را با کاما جدا کنید. مثال: USD, EUR, GBP, BTC, ETH"
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
            <p className="mt-2 text-sm text-gray-400">
              ارزها با کاما جدا شوند. (BTC, ETH, USD, EUR)
            </p>
            {formData.currencies && formData.currencies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.currencies.map((currency, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                  >
                    {currency}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-gray-700">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setIsOpenModal(false);
              resetForm();
            }}
          >
            لغو
          </Button>
          <Button
            variant="primary"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={handleSubmit}
            // isLoading={updateMutation.isPending || createMutation.isPending}
            // disabled={updateMutation.isPending || createMutation.isPending}
          >
            {isEditMode ? "ذخیره تغییرات" : "ایجاد تنظیمات"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Confirm
        isOpen={!!isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        isLoading={false}
        onSubmit={() => console.log('adsf')}
        message="آیا از حذف این تنظیمات اطمینان دارید؟"
        // confirmText="حذف"
        // cancelText="لغو"
        // confirmColor="red"
      />
    </div>
  );
}

export default SpiderSettingsPage;