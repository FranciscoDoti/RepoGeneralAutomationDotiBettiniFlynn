@SAVI
@Brightcove

Feature: Brightcove Media

  Scenario: Navigate to Brightcove and download excel 

    Given I navigate to Brightcove Media Player 
    Then I login to Brightcove Media as "damien.brockmann"
    Then I navigate to download excel 
  #  And I open the excel and save it to 
   
  #Scenario Outline: Pulling ids off of excel spreadsheet

  #  Given I am on data.csv
  #  When I search for column named id
    
  #  Given I navigate to Brightcove Media Player

  #  Given I load a <videoId> in the video player
  #  When I click the play button in the center of the player
  #  Then the video should begin playing
  #  When I click the pause button in the bottom bar of the player
  #  Then the video should pause

  #      Examples:
  #          | videoId         |
  #          | file:spec/ |