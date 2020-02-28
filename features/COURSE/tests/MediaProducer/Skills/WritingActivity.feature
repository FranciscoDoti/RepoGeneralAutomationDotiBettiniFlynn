Feature: Media Producer creates writing activity in Skills Production Template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to create Custom Writing activity 

      Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         | 

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course

        And I activate "Skills Production Template" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | Skills Production Template      |   E2E 301     |  Active On Date      | 
        

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I create "Skills Writing" custom activity in "Create" tab
        And I click on "Production" Tab

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Skills Writing                                |

        And I add custom activity to Content Library
            | activity                                      |    
            | Skills Writing                                |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Skills Writing                                |


            