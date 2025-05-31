import { Suspense, useState } from "react";
import TableData from "../../widgets/table/table";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";

import plus from "/src/assets/icons/plus.svg";

import { Modal} from "@mui/material";
import ModalAddDataComponent from "../../widgets/addData/addDataModal";




function MainPage() {
  const [isMenu, setIsMenu] = useState(false);
  
  return (
    <>
      <div className="p-[5px] flex flex-col gap-[20px] relative">
        <Header></Header>
        <Modal
          open={isMenu}
          onClose={() => setIsMenu(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalAddDataComponent setIsMenu={setIsMenu}></ModalAddDataComponent>
        </Modal>
        <div className="w-full h-full">
          <div
            onClick={() => setIsMenu(!isMenu)}
            className="w-[50px] h-[50px] cursor-pointer border p-[2px] rounded-lg"
          >
            <img src={plus} alt="" />
          </div>
        </div>
        <div className="lg:p-[10px] rounded-lg">
          <Suspense fallback="loading">
            <TableData></TableData>
          </Suspense>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default MainPage;
