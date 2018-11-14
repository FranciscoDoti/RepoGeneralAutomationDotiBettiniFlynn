Feature: Brightcove Video Player

  Scenario: Verify that Brightcove Player is available in SAVI PO2 dot me
    Given I login to sapling SAVIPO2
    When I open the Brightcove Player
    Then I can play a video
