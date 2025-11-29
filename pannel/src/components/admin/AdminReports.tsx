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
import Input from "../form/input/InputField";
import { useTheme } from "../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import Button from "../ui/button/Button";
import { getAdminLogs } from "../../server/admin";
import DetailModal from "./DetailModal";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  ["user.name"]: string;
  ["user.userName"]: string;
  ["action.title"]: string;
  ["action.date"]: string;
  ["action.time"]: string;
  actions: any;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function AdminReports() {
  const [detailData, setDetailData] = useState<any>({});
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const handleCloseDetailModal = () => setIsOpenDetail(false);

  const { data } = useQuery({
    queryKey: ["getAdminLogs"],
    queryFn: getAdminLogs,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "user.name", headerName: "نام" },
    { field: "user.userName", headerName: "نام کاربری" },
    { field: "action.title", headerName: "عنوان اقدام" },
    {
      field: "action.date",
      headerName: "تاریخ",
    },
    {
      field: "action.time",
      headerName: "ساعت",
    },

    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: (params: any) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setIsOpenDetail(true);
            setDetailData(params?.data);
          }}
        >
          جزئیات
        </Button>
      ),
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      diplay: "flex",
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
      <div className="my-4 flex gap-4 w-full justify-between">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="جستجو..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <AgGridReact
          ref={gridRef}
          theme={theme === "dark" ? themeDark : themeLight}
          enableRtl
          pagination
          localeText={AG_GRID_LOCALE_IR}
          rowData={data && data.data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      {isOpenDetail && (
        <DetailModal
          isOpen={!!isOpenDetail}
          onClose={handleCloseDetailModal}
          data={detailData}
        />
      )}
    </>
  );
}

export default AdminReports;
