import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./FormDataStyle.css";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { addData } from "../../../services/AddDataApi";
import TableRowInterface from "../../../interfaces/TableRowInterface";
import { editData } from "../../../services/EditDataApi";
import { useDispatch } from "react-redux";
import { editRecord, setData } from "../../../reducers/TableSlice";
import { fetchTableData } from "../../../services/GetDataApi";

interface FormData {
  id?: string;
  companySigDate: Dayjs | null;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: Dayjs | null;
  employeeSignatureName: string;
}

interface FormErrors {
  [key: string]: boolean;
}

function DataForm({
  formType,
  changeData,
  close,
}: {
  formType: string;
  changeData?: TableRowInterface;
  close: (arg: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>(
    formType === "add"
      ? {
          companySigDate: null,
          companySignatureName: "",
          documentName: "",
          documentStatus: "",
          documentType: "",
          employeeNumber: "",
          employeeSigDate: null,
          employeeSignatureName: "",
        }
      : {
          id: changeData?.id || "",
          companySigDate: changeData ? dayjs(changeData.companySigDate) : null,
          companySignatureName: changeData?.companySignatureName || "",
          documentName: changeData?.documentName || "",
          documentStatus: changeData?.documentStatus || "",
          documentType: changeData?.documentType || "",
          employeeNumber: changeData?.employeeNumber || "",
          employeeSigDate: changeData
            ? dayjs(changeData.employeeSigDate)
            : null,
          employeeSignatureName: changeData?.employeeSignatureName || "",
        }
  );
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleDateChange = (name: keyof FormData, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submissionData = {
      ...formData,
      companySigDate: formData.companySigDate?.toISOString(),
      employeeSigDate: formData.employeeSigDate?.toISOString(),
    };
    try {
      if (formType === "add") {
        await addData(submissionData);

        const tableData = await fetchTableData();
        dispatch(setData(tableData));
      } else if (formData.id) {
        await editData(formData.id, submissionData);
        dispatch(editRecord({ ...submissionData, id: formData.id }));
      }
      close(false);
    } catch {
      setError("Возникла ошибка. Попробуйте позже");
    }
  };

  return (
    <div className="popUpBackground">
      <div className="formPopUp">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {" "}
          <Button variant="contained" onClick={() => close(false)}>
            <CloseIcon />
          </Button>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container maxWidth="sm">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <DatePicker
                label="Дата подписи компании"
                value={formData.companySigDate}
                onChange={(date) => handleDateChange("companySigDate", date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    error: errors.companySigDate,
                    helperText: errors.companySigDate
                      ? "Это поле обязательно"
                      : "",
                    required: true,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Имя подписавшего от компании"
                name="companySignatureName"
                value={formData.companySignatureName}
                onChange={handleChange}
                error={errors.companySignatureName}
                helperText={
                  errors.companySignatureName ? "Это поле обязательно" : ""
                }
                required
              />
              <TextField
                fullWidth
                label="Название документа"
                name="documentName"
                value={formData.documentName}
                onChange={handleChange}
                error={errors.documentName}
                helperText={errors.documentName ? "Это поле обязательно" : ""}
                required
              />
              <TextField
                fullWidth
                label="Статус документа"
                name="documentStatus"
                value={formData.documentStatus}
                onChange={handleChange}
                error={errors.documentStatus}
                helperText={errors.documentStatus ? "Это поле обязательно" : ""}
                required
              />
              <TextField
                fullWidth
                label="Тип документа"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                error={errors.documentType}
                helperText={errors.documentType ? "Это поле обязательно" : ""}
                required
              />
              <TextField
                fullWidth
                label="Номер сотрудника"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                error={errors.employeeNumber}
                helperText={errors.employeeNumber ? "Это поле обязательно" : ""}
                required
              />
              <DatePicker
                label="Дата подписи сотрудника"
                value={formData.employeeSigDate}
                onChange={(date) => handleDateChange("employeeSigDate", date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    error: errors.employeeSigDate,
                    helperText: errors.employeeSigDate
                      ? "Это поле обязательно"
                      : "",
                    required: true,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Имя подписавшего сотрудника"
                name="employeeSignatureName"
                value={formData.employeeSignatureName}
                onChange={handleChange}
                error={errors.employeeSignatureName}
                helperText={
                  errors.employeeSignatureName ? "Это поле обязательно" : ""
                }
                required
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" fullWidth variant="contained">
                Отправить
              </Button>
            </Box>
          </Container>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default DataForm;
