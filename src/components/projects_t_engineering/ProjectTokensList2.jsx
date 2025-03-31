import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { currentUrl } from "../../constants/global";
import { ButtonProximo, ButtonAposentar, Input } from "./styles2";
import InputMask from "@mona-health/react-input-mask";

const ProjectTokensList2 = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dentro do seu componente:
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const inputRef = React.useRef();

  useEffect(() => {
    setItemsPerPage(12);
    fetchData(currentYear);
  }, [currentPage, itemsPerPage, currentYear]);

  const fetchData = async (currentYear) => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem("Authorization");
      const headers = { Authorization: `Bearer ${token}` };

      const requestData = {
        meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        ano: currentYear,
      };

      const response = await axios.post(
        `${currentUrl}/api/project_tokens/get_by_months`,
        requestData,
        { headers }
      );

      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  const cellStyle = {
    width: "150px",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "20px",
    textAlign: "center",
    color: "rgb(54,54,54)",
  };

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <h2>Tokens Visão Mensal</h2>
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: "rgb(79,79,79)",
              height: "25px",
              color: "white",
            }}
          >
            <th style={{ width: "100px", padding: "10px" }}>Mês</th>
            <th style={{ width: "100px", padding: "10px" }}>Ativos</th>
            <th style={{ width: "100px", padding: "10px" }}>Aposentados</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            items
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <tr
                  key={`token-${item.id}-${index}`}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "rgb(139, 195, 74)" : "white",
                  }}
                >
                  <td style={cellStyle}>{item.name}</td>
                  <td style={cellStyle}>{item.ativos}</td>
                  <td style={cellStyle}>{item.aposentados}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      <div>
        <span>Página: </span>
        {pages.map((page) => (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>

      <div style={{ width: "100%", position: "absolute", left: "165px" }}>
        <div style={{ width: "300px" }}>
          <ButtonProximo
            onClick={handlePrevYear}
            style={{ margin: "0px 20px 0px 0px" }}
          >
            {"<<"}
          </ButtonProximo>

          <Input
            mask="9999"
            maskChar={null} // Esta prop será filtrada e não chegará ao DOM
            value={String(currentYear)}
            disabled
            style={{ width: "50px" }}
            ref={inputRef}
          />

          <ButtonProximo
            onClick={handleNextYear}
            style={{ margin: "0px 15px 10px 20px" }}
          >
            {">>"}
          </ButtonProximo>
        </div>
      </div>
    </div>
  );
};

export default ProjectTokensList2;
