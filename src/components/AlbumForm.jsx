import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const formStyle = {
  padding: "16px",
  maxWidth: "400px",
  margin: "auto"
};

const buttonStyle = {
  marginRight: "8px"
};

function AlbumForm({ handleAddAlbum, setShowForm }) {
  const [newAlbum, setNewAlbum] = useState({ title: "", artist: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum({ ...newAlbum, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAlbum(newAlbum);
    setNewAlbum({ title: "", artist: "" });
  };

  return (
    <Paper elevation={3} style={formStyle}>
      <Typography variant="h6" gutterBottom>
        Adicionar Album
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={newAlbum.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Artista"
              name="artist"
              value={newAlbum.artist}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={buttonStyle}
          >
            Adicionar
          </Button>
          <Button onClick={() => setShowForm(false)} style={buttonStyle}>
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default AlbumForm;