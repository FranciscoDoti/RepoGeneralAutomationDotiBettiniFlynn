@Course @Smoke @Skip
Feature: Verify that Media Editor is able to create URL in Skills Template

    @mediaeditor-delete-course
    Scenario: Verify that Media Editor is able to create a custom task with URL in Skills Templete

       Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
           | courseType  | productModel | courseName          |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills URLTemplate  |                  | E2E 301      | 9781464199498  | draft         |

        And I search for "Skills URLTemplate" course                      

        And I activate "Skills URLTemplate" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills URLTemplate            |   E2E 301     |  Active On Date      | 

        And I click on "Skills URLTemplate" card
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


       