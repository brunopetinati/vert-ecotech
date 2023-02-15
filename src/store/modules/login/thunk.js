import myAPI from "../../../constants/my-api";
import { userLogin } from "./actions";
import Swal from "sweetalert2";

const loginThunk = (result, navigate) => (dispatch) => {
  myAPI
    .post("/login", result)
    .then((res) => {
      window.localStorage.setItem("authToken", res.data.accessToken);
      dispatch(userLogin(res.data.accessToken));
      navigate("/my_favorites");
      window.location.reload();
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

export default loginThunk;