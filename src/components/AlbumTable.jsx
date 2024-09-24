import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const tableStyle = {
  minWidth: 650,
  margin: "auto",
  marginTop: "20px"
};

const headerCellStyle = {
  backgroundColor: "#f5f5f5",
  fontWeight: "bold"
};

function AlbumTable({ albums, handleDeleteAlbum, setShowForm }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (albumToDelete) {
      handleDeleteAlbum(albumToDelete.id);
      setAlbumToDelete(null);
    }
    setOpenDialog(false);
  };

  const handleOpenDialog = (album) => {
    setAlbumToDelete(album);
    setOpenDialog(true);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" aligntItems="center">
        <Typography variant="h6">Lista de Álbuns</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowForm(true)}
        >
          Adicionar Album
        </Button>
      </Box>
      <TableContainer component={Paper} style={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle} align="center">
                Título
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Artista
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {albums.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="subtitle1">
                    Não há álbuns disponíveis.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              albums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell align="center">{album.title}</TableCell>
                  <TableCell align="center">{album.artist}</TableCell>
                  <TableCell ailgn="center">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDialog(album)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir o album "{albumToDelete?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlbumTable;