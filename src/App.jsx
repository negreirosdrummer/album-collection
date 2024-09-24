import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumForm from "./components/AlbumForm";
import AlbumTable from "./components/AlbumTable";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import API_URL from "../config";

const appBarStyle = {
  marginBottom: "20px"
};

const pageTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px"
};

function App() {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${API_URL}/albums`);
      setAlbums(response.data);
    } catch (error) {
      console.error("Erro ao buscar albums:", error);
    }
  };

  const handleAddAlbums = async (newAlbum) => {
    try {
      await axios.post(`${API_URL}/albums`, newAlbum);
      fetchAlbums();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao adicionar album:", error);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(`${API_URL}/albums/${albumId}`);
      fetchAlbums();
    } catch (error) {
      console.error("Erro ao excluir album:", error);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6">Coleção de Álbuns</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" style={pageTitleStyle}>
          Coleção de Álbuns
        </Typography>
        {showForm ? (
          <AlbumForm handleAddAlbum={handleAddAlbums} setShowForm={setShowForm} />
        ) : (
          <AlbumTable
            albums={albums}
            handleDeleteAlbum={handleDeleteAlbum}
            setShowForm={setShowForm}
          />
        )}
      </Container>
    </div>
  );
}

export default App;