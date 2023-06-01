import { useDispatch } from "react-redux";

//#7eff00 - primária

//#054d00

const awsUrl = 'https://api.vertecotech.com';
const awsUrlTest = 'http://18.218.97.13:8000';
//const awsUrl = '18.218.97.13:8000/api';
const localHost = 'http://localhost:8000';
//const localHost = 'localhost:8000/api';

export const currentUrl = awsUrl;

// atenção: exemplo de url
// `${currentUrl}/api/reset-password/${currentUser.id}/`;


//const currentUser = useDispatch((state) => state.user.currentUser);


// insomnia "baseUrl": "http://18.218.97.13:8000/api"

// "http://3.82.211.64:8000/api/login/"

// https://support.google.com/domains/answer/7630973?hl=pt-BR&sjid=13761335246896636095-NA#zippy=%2Creceber-um-certificado-ssltls-de-uma-autoridade-certificadora

// https://alunos.kenzie.com.br/courses/39/assignments/7424?module_item_id=8522 => Lambda
 
// https://alunos.kenzie.com.br/courses/39/assignments/7420?module_item_id=8518 => RDS



// https://d2kcgtfad3ncth.cloudfront.net/api

// `${currentUrl}/api/login/`

// ec2-13-58-237-27.us-east-2.compute.amazonaws.com


// está funcionando

// http://${currentUrl}:8000/api/login/