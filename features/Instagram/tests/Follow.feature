@Instagram
Feature: Pruebas para seguir gente en la pagina de instagram.

    @EnviarLikes
    Scenario Outline: Seguir gente en instagram
        Given Inicio sesion en instagram con <usuario> y <contraseña>
        And  Ir a la seccion sugerencias
        When Empiezo a seguir "60" personas

        Examples:
            | usuario                     | contraseña      |
            | featureprueba2020@gmail.com | featuredeprueba |