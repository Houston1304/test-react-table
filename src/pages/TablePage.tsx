import { useEffect, useState } from "react";
import { fetchTableData } from "../services/GetDataApi";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddDataForm from "../components/Table/DataForm/DataForm";
import { useDispatch, useSelector } from "react-redux";
import { removeRecord, setData } from "../reducers/TableSlice";
import TableRowInterface from "../interfaces/TableRowInterface";
import { removeData } from "../services/RemoveDataApi";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import RemovePopUp from "../components/Table/ClosePopUp/RemovePopUp";

function TablePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.table.data);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState("");
  const [changeData, setChangeData] = useState<TableRowInterface>();
  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [removePop, setRemovePop] = useState(false);
  const [removeID, setRemoveID] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const tableData = await fetchTableData();
        dispatch(setData(tableData));
      } catch (err) {
        setError("Не удалось загрузить данные");
      }
      setLoading(false);
    };

    loadData();
  }, []);

  async function removeTableRecord(id: string) {
    try {
      await removeData(id);

      dispatch(removeRecord(id));
    } catch (err) {
      setError("Не удалось удалить данные");
    }
  }

  function exit() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <div className="exitContainer">
        <Button variant="contained" onClick={exit}>
          Выход
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Дата подписи компании</TableCell>
              <TableCell>Имя подписавшего от компании</TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>Статус документа</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Номер сотрудника</TableCell>
              <TableCell>Дата подписи сотрудника</TableCell>
              <TableCell>Имя подписавшего сотрудника</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {data.map((row: TableRowInterface) => (
                <TableRow key={row.id}>
                  <TableCell>{row.companySigDate}</TableCell>
                  <TableCell>{row.companySignatureName}</TableCell>
                  <TableCell>{row.documentName}</TableCell>
                  <TableCell>{row.documentStatus}</TableCell>
                  <TableCell>{row.documentType}</TableCell>
                  <TableCell>{row.employeeNumber}</TableCell>
                  <TableCell>{row.employeeSigDate}</TableCell>
                  <TableCell>{row.employeeSignatureName}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenForm(true);
                        setFormType("edit");
                        setChangeData(row);
                      }}
                    >
                      Изменить
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setRemovePop(true);
                        setRemoveID(row.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!loading && (
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          onClick={() => {
            setOpenForm(true);
            setFormType("add");
          }}
        >
          Добавить запись
        </Button>
      )}

      {openForm && (
        <AddDataForm
          formType={formType}
          changeData={changeData}
          close={(status: boolean) => setOpenForm(status)}
        />
      )}
      {removePop && (
        <RemovePopUp
          callback={() => removeTableRecord(removeID)}
          close={(status: boolean) => setRemovePop(status)}
        ></RemovePopUp>
      )}
    </div>
  );
}

export default TablePage;
