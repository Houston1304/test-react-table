import { useEffect, useState } from "react";
import { fetchTableData } from "../../services/GetDataApi";
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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeRecord, setData } from "../../reducers/TableSlice";
import TableRowInterface from "../../interfaces/TableRowInterface";
import { removeData } from "../../services/RemoveDataApi";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import RemovePopUp from "../../components/Table/RemovePopUp/RemovePopUp";
import "./TablePageStyle.css";
import DataForm from "../../components/Table/DataForm/FormData";

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
        <Button className="exitButton" variant="contained" onClick={exit}>
          Выход
        </Button>
      </div>
      <TableContainer component={Paper} className="tableContainer">
        <Table size="small" aria-label="a dense table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell className="tableHeaderCell">
                Дата подписи компании
              </TableCell>
              <TableCell className="tableHeaderCell">
                Имя подписавшего от компании
              </TableCell>
              <TableCell className="tableHeaderCell">
                Название документа
              </TableCell>
              <TableCell className="tableHeaderCell">
                Статус документа
              </TableCell>
              <TableCell className="tableHeaderCell">Тип документа</TableCell>
              <TableCell className="tableHeaderCell">
                Номер сотрудника
              </TableCell>
              <TableCell className="tableHeaderCell">
                Дата подписи сотрудника
              </TableCell>
              <TableCell className="tableHeaderCell">
                Имя подписавшего сотрудника
              </TableCell>
              <TableCell className="tableHeaderCell"></TableCell>
              <TableCell className="tableHeaderCell"></TableCell>
            </TableRow>
          </TableHead>
          {error && (
            <TableRow>
              <TableCell
                colSpan={10}
                align="center"
                className="loadingIndicator"
              >
                <Typography color="error">{error}</Typography>
              </TableCell>
            </TableRow>
          )}
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={10}
                align="center"
                className="loadingIndicator"
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {data.map((row: TableRowInterface) => (
                <TableRow key={row.id} className="tableRow">
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
                      className="actionButton"
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
                      className="deleteButton"
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
          className="addButton"
          style={{
            margin: "20px",
            backgroundColor: "#4caf50",
          }}
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
        <DataForm
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
