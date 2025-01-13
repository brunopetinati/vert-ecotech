import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Swal from 'sweetalert2';
import { currentUrl } from '../../constants/global';
//import styled from 'styled-components';

const ProjectTokensCrud = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);  


  useEffect(() => {
    setItemsPerPage(10);
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${currentUrl}/api/project_tokens/select`, { headers });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const data = { ...formData, project: project_id };
      const response = await axios.post(`${currentUrl}/api/project_tokens/insert`, data, { headers });
      setItems([...items, response.data]);
      setFormData({});
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleEdit = async (id) => {
    console.log("Edit item with ID:", id);
    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const data = { ...formData, project: project_id };
      console.log("Data to send:", data);
      const response = await axios.put(`${currentUrl}/api/project_tokens/update/${id}/`, data, { headers });
      const updatedItems = items.map((item) => (item.id === id ? response.data : item));
      setItems(updatedItems);
      setFormData({});
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${currentUrl}/api/project_tokens/${id}/delete`, { headers });
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    if (item) {
      setSelectedItem(item);
      setFormData(item);
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setSelectedItem(null);
    setFormData({});
    setIsEditing(false);
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      // Realize sua lógica de pesquisa aqui
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const cellStyle = {
    width: '100px',
    maxWidth: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '75vh' }}>
      <h1>Project Tokens</h1>
      <table>
        <thead>
          <tr>
            <th>Tokens</th>
            <th>Data Hora</th>
            <th>Quantidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Tokens"
                value={formData.token || ''}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Data Hora"
                value={formData.date_time_cad || ''}
                onChange={(e) => setFormData({ ...formData, date_time_cad: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Quantidade"
                value={formData.quantidade || ''}
                onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Status"
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
            </td>
            <td>
              {isEditing ? (
                <div>
                  <button onClick={() => handleEdit(selectedItem.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={handleCreate}>Create</button>
              )}
            </td>
          </tr>
          {isLoading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'lightgreen' : 'white' }}>
                <td style={cellStyle}>{item.token}</td>
                <td style={cellStyle}>{item.date_time_cad}</td>
                <td style={cellStyle}>{item.quantidade}</td>
                <td style={cellStyle}>{item.status ? 'Ativo' : 'Inativo'}</td>
                <td>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <span>Página: </span>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectTokensCrud;
