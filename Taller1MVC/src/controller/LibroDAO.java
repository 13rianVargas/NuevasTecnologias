/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import model.Libro;
import utils.Conexion;

public class LibroDAO {

    private Connection conecta = null;

    public void insertLibro(Libro libro) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "INSERT INTO libros(titulo, autor, anio, precio, tipo, unidades) VALUES (?, ?, ?, ?, ?, ?);";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, libro.getTitulo());
            statement.setString(2, libro.getAutor());
            statement.setInt(3, libro.getAnio());
            statement.setDouble(4, libro.getPrecio());
            statement.setString(5, libro.getTipo());
            statement.setInt(6, libro.getCantidad());

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                JOptionPane.showMessageDialog(null, "¡El registro fue agregado exitosamente!");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode() + "\nError :" + ex.getMessage());
        }
    }

    public Libro searchLibro(int id) {
        Libro libro = null;
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }

            String sql = "SELECT * FROM libros WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, String.valueOf(id));
            
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                libro = new Libro(result.getString("titulo"), result.getString("autor"),
                        result.getInt("anio"), result.getDouble("precio"), result.getString("tipo"),
                        result.getInt("unidades"));
            } else {
                JOptionPane.showMessageDialog(null, "¡No existe registro!");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }
        return libro;
    }//cierra searchLibro

    public void updateLibro(int id, Libro libro) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "UPDATE libros SET titulo = ?, autor = ?, anio = ?, precio = ?, tipo = ?, unidades = ? WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, libro.getTitulo());
            statement.setString(2, libro.getAutor());
            statement.setString(3, String.valueOf(libro.getAnio()));
            statement.setString(4, String.valueOf(libro.getPrecio()));
            statement.setString(5, libro.getTipo());
            statement.setString(6, String.valueOf(libro.getCantidad()));
            statement.setString(7, String.valueOf(id));
            int result = statement.executeUpdate();
            if (result > 0) {
                JOptionPane.showMessageDialog(null, "Libro actualizado");
            } else {
                JOptionPane.showMessageDialog(null, "Error al actualizar libro");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }
    }//cierra updateLibro

    public void deleteLibro(int id) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "DELETE FROM libros WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, String.valueOf(id));
            int result = statement.executeUpdate();
            if (result > 0) {
                JOptionPane.showMessageDialog(null, "Libro eliminado");
            } else {
                JOptionPane.showMessageDialog(null, "Error al eliminar libro");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }  
    }//cierra deleteLibro
}//cierra class//cierra class
