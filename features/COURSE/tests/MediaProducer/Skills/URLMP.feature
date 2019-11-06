@Course @Smoke
Feature: Verify that mediaProducer is able to create URL in Skills Production Template

   @mediaproducer-delete-courseTemplate
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course
        And I activate the "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      |                         

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"." message is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Google                                        |

        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Google                                        |                                                        