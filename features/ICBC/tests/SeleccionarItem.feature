@ICBC
Feature: Pruebas para seleccionar un item en ICBC
Background: Ingresar a la pagina ICBC

  Scenario: Buscar producto y comprarlo
        When  Busco "Aire acondicionado Surray" y Selecciono en comprar 
        Then Inicio sesion con usuario "icbcclub06" y contraseña "prueba01"
