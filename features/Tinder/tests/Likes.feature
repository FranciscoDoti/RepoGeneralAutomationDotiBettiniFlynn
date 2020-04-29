@Tinder
Feature: To verify Pool Items

    @EnviarLikes
    Scenario Outline: Enviar likes en tinder
        Given Inicio sesion en Tinder con <usuario> y <contraseña>
        And Dejo todo preparado para que aparezca la pantalla de dar likes
        When Doy "10" likes

        Examples:
            | usuario                    | contraseña   |
            | pipo.mataderos@hotmail.com | shokitoblues |