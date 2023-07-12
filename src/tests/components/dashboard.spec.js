import Dashboard from "../../components/dashboard";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

afterEach(() => { 
  cleanup();
});