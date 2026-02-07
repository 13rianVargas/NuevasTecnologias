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
        //Por temas de seguridad, estos datos deberían ir en un archivo aparte. 
        //Para efectos del ejercicio se dejan aquí. 
        String host = "localhost";
        String user = "root"; 
        String password = "";
        String port = "3306";
        String db = "Investigacion_APIs";
        String dbURL = "jdbc:mysql://" + host + ":" + port + "/" + db;
         try { 
             conn = DriverManager.getConnection(dbURL, user, password); 
         } catch (SQLException ex){ 
             Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex); 
         }
          return conn;
          }//cierra getConnection
    //Para probar la conexión: Si se hace clic derecho >> Run file
    //sobre este archivo , no debería aparecer errores
    //Si aparecen errores, verificar que estén bien los datos de conexiÃ³n
    public static void main(String[] args){ 
        getConnection(); }
}//cierra class
