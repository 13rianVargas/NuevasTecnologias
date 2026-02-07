/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import model.Articulo;
import utils.Conexion;
import java.sql.ResultSet;

public class ArticuloDAO {

    private Connection conecta = null;

    public void insertArticulo(Articulo articulo) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "INSERT INTO articulos(titulo, autores, anio, revista, volumen, numero, paginas, doi) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, articulo.getTitulo());
            statement.setString(2, articulo.getAutores());
            statement.setInt(3, articulo.getAnio());
            statement.setString(4, articulo.getRevista());
            statement.setInt(5, articulo.getVolumen());
            statement.setInt(6, articulo.getNumero());
            statement.setInt(7, articulo.getPaginas());
            statement.setDouble(8, articulo.getDoi());

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                JOptionPane.showMessageDialog(null, "¡El registro fue agregado exitosamente!");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode() + "\nError :" + ex.getMessage());
        }
    }

    public Articulo searchArticulo(int id) {
        Articulo articulo = null;
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }

            String sql = "SELECT * FROM articulos WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setInt(1, id);
            
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                articulo = new Articulo(result.getString("titulo"), result.getString("autores"),
                        result.getInt("anio"), result.getString("revista"), result.getInt("volumen"),
                        result.getInt("numero"), result.getInt("paginas"), result.getDouble("doi"));
                articulo.setId(result.getInt("id"));
            } else {
                JOptionPane.showMessageDialog(null, "¡No existe registro!");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }
        return articulo;
    }//cierra searchArticulo

    public void updateArticulo(int id, Articulo articulo) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "UPDATE articulos SET titulo = ?, autores = ?, anio = ?, revista = ?, volumen = ?, numero = ?, paginas = ?, doi = ? WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setString(1, articulo.getTitulo());
            statement.setString(2, articulo.getAutores());
            statement.setInt(3, articulo.getAnio());
            statement.setString(4, articulo.getRevista());
            statement.setInt(5, articulo.getVolumen());
            statement.setInt(6, articulo.getNumero());
            statement.setInt(7, articulo.getPaginas());
            statement.setDouble(8, articulo.getDoi());
            statement.setInt(9, id);
            
            int result = statement.executeUpdate();
            if (result > 0) {
                JOptionPane.showMessageDialog(null, "Artículo actualizado");
            } else {
                JOptionPane.showMessageDialog(null, "Error al actualizar artículo");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }
    }//cierra updateArticulo

    public void deleteArticulo(int id) {
        try {
            if (conecta == null) {
                conecta = Conexion.getConnection();
            }
            String sql = "DELETE FROM articulos WHERE id = ?;";
            PreparedStatement statement = conecta.prepareStatement(sql);
            statement.setInt(1, id);
            int result = statement.executeUpdate();
            if (result > 0) {
                JOptionPane.showMessageDialog(null, "Artículo eliminado");
            } else {
                JOptionPane.showMessageDialog(null, "Error al eliminar artículo");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Código : " + ex.getErrorCode()
                    + "\nError :" + ex.getMessage());
        }  
    }//cierra deleteArticulo
}//cierra class
