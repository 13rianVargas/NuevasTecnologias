/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package taller1mvc;

/**
 *
 * @author 13rianvargas
 */
public class Taller1MVC {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        views.FrmNuevoArticulo vista = new views.FrmNuevoArticulo();
        vista.setVisible(true);
        vista.setLocationRelativeTo(null);
        vista.setTitle("Gestión de Artículos de Investigación");
    }
    
}
