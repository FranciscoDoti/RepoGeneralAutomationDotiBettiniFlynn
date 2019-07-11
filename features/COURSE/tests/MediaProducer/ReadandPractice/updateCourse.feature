 @Course
 @Smoke
 Feature: Update the Template   
     
    @delete-mediaproducer-courses       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |
            
        Then I verify that "Read & Practice Template" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Template  |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |