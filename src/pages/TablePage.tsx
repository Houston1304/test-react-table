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
import AddDataForm from "../components/Table/AddDataForm";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../reducers/TableSlice";

interface TableRowType {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

function TablePage() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.table.data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);

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

  if (loading) {
    return <CircularProgress />;
  }

  async function addTableRecord() {}

  return (
    <div>
      {" "}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>companySigDate</TableCell>
              <TableCell>companySignatureName</TableCell>
              <TableCell>documentName</TableCell>
              <TableCell>documentStatus</TableCell>
              <TableCell>documentType</TableCell>
              <TableCell>employeeNumber</TableCell>
              <TableCell>employeeSigDate</TableCell>
              <TableCell>employeeSignatureName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: TableRowType) => (
              <TableRow key={row.id}>
                <TableCell>{row.companySigDate}</TableCell>
                <TableCell>{row.companySignatureName}</TableCell>
                <TableCell>{row.documentName}</TableCell>
                <TableCell>{row.documentStatus}</TableCell>
                <TableCell>{row.documentType}</TableCell>
                <TableCell>{row.employeeNumber}</TableCell>
                <TableCell>{row.employeeSigDate}</TableCell>
                <TableCell>{row.employeeSignatureName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={() => setOpenForm(true)}>
        Добавить запись
      </Button>
      {openForm && (
        <AddDataForm close={(status: boolean) => setOpenForm(status)} />
      )}
    </div>
  );
}

export default TablePage;
