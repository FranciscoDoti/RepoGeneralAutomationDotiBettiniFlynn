 @Course
 @Smoke
 Feature: Update the Template   
     
    @delete-mediaproducer-courses       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | learningObjective | macmillan calculus           |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |
            
        Then I verify that "Qualitative Template" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Template      |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |