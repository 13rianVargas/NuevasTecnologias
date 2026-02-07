/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Conexion {
    public static Connection getConnection() {
        Connection conn = null;
        // Por temas de seguridad, estos datos deberían ir en un archivo aparte.
        // Para efectos del ejercicio se dejan aquí.
        String host = "gateway01.us-east-1.prod.aws.tidbcloud.com";
        String user = "67N8r6KT8rXkVVH.root";
        String password = "1aF0WdlrFRS8EG6L"; // HOLA PROFE CECI, ya se que hay que poner variables de entorno, pero es
                                              // para que no tengas problemas al probar la conexion.
        String port = "4000";
        String db = "Investigacion_APIs";
        String dbURL = "jdbc:mysql://" + host + ":" + port + "/" + db;
        try {
            conn = DriverManager.getConnection(dbURL, user, password);
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
        return conn;
    }// cierra getConnection

    public static void main(String[] args) {
        getConnection();
    }
}// cierra class