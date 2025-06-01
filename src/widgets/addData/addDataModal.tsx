import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { postData } from "../../services/postData";
export const userFields = [
    {name: "id",label:"id",type:"number",required:true},
  { name: "name", label: "Имя", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Телефон", type: "text", required: true },
  { name: "age", label: "Возраст", type: "number", required: true },
  { name: "city", label: "Город", type: "text", required: true },
  { name: "position", label: "Должность", type: "text", required: false },
  { name: "company", label: "Компания", type: "text", required: false },
  { name: "status", label: "Статус", type: "text", required: false},
  { name: "registered", label: "Дата регистрации", type: "date", required: false },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ModalAddDataComponent({setIsMenu}:{setIsMenu:Function}){
    const [disableButton,setDisableButton] = useState(false);
    const [errorException,setErrorException] = useState<string>('');
    const FieldForm = useForm();
    const getData = async (data:any) => {
        setDisableButton(true)
        try{
            await postData(data)
            FieldForm.reset();
            setDisableButton(false)
        } catch(error){
            setErrorException("Что-то не так");
            console.error()
            setTimeout(() => {
                setErrorException("");
            },5000)
        }
        finally{
            setIsMenu(false)
        }
    }
    return (
        <Box sx={style}>
            <Box component="form" onSubmit={FieldForm.handleSubmit(getData)} sx={{
              display: "flex",
              flexDirection: "column",
              gap:"10px"
            }}>
                <div className="flex gap-[10px] flex-wrap">
                    {userFields.map((item) => (
                        <Controller key={item.name} name={item.name} control={FieldForm.control} defaultValue=""
                        rules={{required: item.required}} render={({field}) => (
                            <TextField required={item.required} type={item.type} {...field} label={item.type !== "date" ? item.label : ""}></TextField>
                        )}></Controller>
                    ))}
                </div>
                <Button disabled={disableButton} type="submit" sx={{
                    border: "1px solid"
                }}>{errorException === "" ? "Загрузить данные" : errorException}</Button>
            </Box>
           
            
        </Box>
    )
}