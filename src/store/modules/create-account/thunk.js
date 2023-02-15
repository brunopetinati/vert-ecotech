import myAPI from "../../../constants/my-api";
import { userRegister } from "./actions";
import Swal from "sweetalert2";

const userThunk = (createUserObject, navigate) => async (dispatch) => {
  await myAPI
    .post("/users", createUserObject)
    .then((res) => {
      dispatch(userRegister(res));
      navigate("/");
    })
    .catch(() =>
      Swal.fire({
        title: "Oops!",
        text: "Por favor, reveja as informações e tente novamente.",
        icon: "error",
        confirmButtonText: "Entendi!",
      })
    );
};

export default userThunk;