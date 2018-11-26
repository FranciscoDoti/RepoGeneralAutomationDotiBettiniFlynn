Feature: Brightcove Video Player

  Scenario: Verify that Brightcove Player is available at SAVIPO2 dotme
    Given I login to sapling SAVIPO2
    When I open the Brightcove Player
    Then I can play a video

  # Scenario: Verify that Brightcove Player is available at standalone link
  #   Given I open the standalone link to a video
  #   Then I can play a video