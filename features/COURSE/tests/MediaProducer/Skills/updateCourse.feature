 @Course @Smoke
 Feature: Update the Template   
     
    @delete-mediaproducer-courses       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with ISBN "9781464199498" and course code "E2E 301" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |
            
        Then I verify that "Skills Template" is created with following data
            | field                 | value                     |
            | courseName            | Skills Template           |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |