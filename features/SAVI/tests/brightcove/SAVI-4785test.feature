@SAVI-4785

Feature: Brightcove Audio, Video Player

Scenario Outline: Test Brightcove Video Players

    Given I opened videoplayer 
    #    When I click the play button in the center of the player       
    #    And the video should begin playing  
    #    When I click the pause button in the bottom bar of the player 
    #    And the video should pause
    #    When I click the play button in the bottom bar of the player   
    #    And the video should begin playing 
        
            Examples:
            |  video                                                                            |                                                      
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5758272834001   |
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5240257271001   | 
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5714430519001   | 
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5755680903001   |
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5240257270001   |     
            |  https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=3936552724001   |