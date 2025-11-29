import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeAlpine,
  colorSchemeDarkBlue,
  colorSchemeLight,
} from "ag-grid-community";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../form/input/InputField";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/button/Button";
import { TrashBinIcon, UpdateIcon } from "../../icons";
import CreateEvent from "./CreateEvent";
import { deleteEvent, getEvents, homeEvent } from "../../server/events";
import Confirm from "../confirm";
import UpdateEvent from "./UpdateEvent";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  type: string;
  homeEvenets : string;
  ["admin.userName"]: string;
  actions: string;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function EventsList() {
  const [isOpenDel, setIsOpenDel] = useState<string>("");
  const [isOpenUp, setIsOpenUp] = useState<string>("");
  const [updateValues, setUpdateValues] = useState<any>({});
  
  const [isOpenHomeEvent, setIsOpenHomeEvent] =
    useState<string>("");


  const handleCloseConfirm = () => setIsOpenDel("");
  const handleCloseUp = () => setIsOpenUp("");
  const handleCloseHomeEvent = () => setIsOpenHomeEvent("");

  const mutation = useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: deleteEvent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("رویداد با موفقیت حذف شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error("رویداد حذف نشد ، لطفا دوباره امتحان کنید");
        handleCloseConfirm();
      }
    },
  });


  const homeEventMutation = useMutation({
    mutationKey: ["showHomeEvent"],
    mutationFn: homeEvent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`${data.message}`);
        refetch();
        handleCloseHomeEvent();
      } else {
        toast.error(data.message ? `${data.message}` : 'خطای ناشناخته');
        handleCloseHomeEvent();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getEvents"],
    queryFn: getEvents,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    { field: "enTitle", headerName: "عنوان انگلیسی" },
    { field: "ruTitle", headerName: "عنوان روسی" },

    {
      field: "type",
      headerName: "محتوا",
      cellRenderer: (params: any) => {
        let isVideo = false;
        let isPicture = false;
        if (
          params?.data?.peVideo?.length > 0 ||
          params?.data?.enVideo?.length > 0 ||
          params?.data?.ruVideo?.length > 0
        ) {
          isVideo = true;
        }
        if (
          params?.data?.pePictures?.length > 0 ||
          params?.data?.enPictures?.length > 0 ||
          params?.data?.ruPictures?.length > 0
        ) {
          isPicture = true;
        }

        return `${isVideo ? "ویدیو" : " "} ${isPicture ? "تصویر" : " "}`;
      },
    },
    { field: "admin.userName", headerName: "نام کاربری ادمین" },
    {
      field: "homeEvenets",
      headerName: "نمایش در صفحه اصلی سایت",
      cellRenderer: (params: any) => {
        return (
          <>
            {params?.value ? (
              <span className="bg-gray-200 rounded-full text-sm p-1 text-gray-900">
                نمایش در صفحه خانه
              </span>
            ) : (
              <span className="bg-gray-200 rounded-full text-sm p-1 text-gray-900">
                عدم نمایش در صفحه خانه
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "homeEvenets",
      width: 150,
      headerName: "نمایش در صفحه خانه",
      cellRenderer: (params: any) => {
        // console.log("ppp", params.value);
        return (
          <div className="checkbox-wrapper-14 mt-4">
            <input
              id="s1-14"
              type="checkbox"
              className="switch"
              // disabled={params.value == true}
              defaultChecked={params?.value}
              checked={params?.value}
              onChange={() => {
                setIsOpenHomeEvent(params.data?._id);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="bg-rose-500 hover:bg-rose-800"
            size="sm"
            startIcon={<TrashBinIcon />}
            onClick={() => {
              setIsOpenDel(params.data._id);
            }}
          >
            حذف
          </Button>
          <Button
            variant="primary"
            className="bg-yellow-400 hover:bg-yellow-500"
            size="sm"
            startIcon={<UpdateIcon />}
            onClick={() => {
              setIsOpenUp(params.data._id);
              setUpdateValues(params.data);
            }}
          >
            به روز رسانی
          </Button>
        </div>
      ),
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    headerStyle: {
      textAlign: "center",
    },
    headerClass: "header-cell",
    filter: true,
    spanRows: true,
    sortable: true,
    resizable: true,
  };

  const gridRef = useRef<AgGridReact>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <div className="my-4 flex gap-4">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="جستجو..."
          onInput={onFilterTextBoxChanged}
        />
        <CreateEvent refetch={refetch} />
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <AgGridReact
          ref={gridRef}
          theme={theme === "dark" ? themeDark : themeLight}
          enableRtl
          pagination
          localeText={AG_GRID_LOCALE_IR}
          rowData={data?.data?.event || []}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <Confirm
        isOpen={!!isOpenHomeEvent}
        onClose={handleCloseHomeEvent}
        isLoading={homeEventMutation.isPending}
        onSubmit={() => homeEventMutation.mutate(isOpenHomeEvent)}
        message="آیا می خواهید این رویداد  در صفحه اصلی سایت(خانه) نمایش داده شود؟"
      />
      <Confirm
        isOpen={!!isOpenDel}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDel)}
        message="آیا میخواهید آموزش را حذف کنید؟"
      />

      <UpdateEvent
        isOpen={isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        data={updateValues}
      />
    </>
  );
}

export default EventsList;
