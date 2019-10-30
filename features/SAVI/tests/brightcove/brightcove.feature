@SAVI
@Brightcove

Feature: Brightcove Media

  Scenario: Navigate to Brightcove and download excel 

    Given I navigate to Brightcove Media Player 
    Then I login to Brightcove Media as "damien.brockmann"
    Then I navigate to download excel 
   