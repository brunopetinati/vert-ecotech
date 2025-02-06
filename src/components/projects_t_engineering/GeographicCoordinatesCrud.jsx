import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';

const GeographicCoordinatesCrud = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${currentUrl}/api/geographic_coordinates/select`, { headers });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const data = { ...formData, project: project_id };
      const response = await axios.post(`${currentUrl}/api/geographic_coordinates/insert`, data, { headers });
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
      const response = await axios.put(`${currentUrl}/api/geographic_coordinates/update/${id}/`, data, { headers });
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
      await axios.delete(`${currentUrl}/api/geographic_coordinates/${id}/delete`, { headers });
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '45vh' }}>
      <h1>Geographic Coordinates</h1>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Description"
                value={formData.descricao || ''}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Latitude"
                value={formData.latitude || ''}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Longitude"
                value={formData.longitude || ''}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
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
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.descricao}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GeographicCoordinatesCrud;
