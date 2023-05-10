import { useDispatch } from "react-redux";

//#7eff00 - primária

//#054d00

const awsUrl = '18.218.97.13';
//const awsUrl = '18.218.97.13:8000/api';
const localHost = 'localhost';
//const localHost = 'localhost:8000/api';

export const currentUrl = localHost;

// atenção: exemplo de url
// `http://${currentUrl}:8000/api/reset-password/${currentUser.id}/`;


//const currentUser = useDispatch((state) => state.user.currentUser);