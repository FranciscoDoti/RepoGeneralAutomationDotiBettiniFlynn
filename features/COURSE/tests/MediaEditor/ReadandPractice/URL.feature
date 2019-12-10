@Course @Smoke @Skip
Feature: Verify that MediaEditor is able to create URL in Read & Practice Template

    @mediaeditor-delete-course
    Scenario: Verify that Admin is able to create a custom task with URL in Read & Practice Template

       Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice URL Template    |                  | E2E 301      | 9781464199498  | draft         | 

        And I search for "Read & Practice URL Template" course                     

        And I activate "Read & Practice URL Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Read & Practice URL Template  |   E2E 301     |  Active On Date      | 

        And I click on "Read & Practice URL Template" card
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


       