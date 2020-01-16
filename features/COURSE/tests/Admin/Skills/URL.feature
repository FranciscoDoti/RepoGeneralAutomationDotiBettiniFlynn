@Course @Smoke @API
Feature: Verify that Admin is able to create URL in Skill Course

    @admin-delete-courseTemplate
    Scenario: Verify that Admin is able to create a custom task with URL in Skill Course 

       Given I login to Achieve-CW as "admin_1"
       When I create a course template as "admin_1" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   |  warn_prebuilt | isbn             |
            | Skills URL Template                 | E2E 301    | topics | active | 1                | true               | 0053B000001YyTMQA0  | template      |   false        |  9781464199499   |  
        

        And I click on search button and input "Skills URL Template" to search the course

        And I click on "Skills URL Template" card
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


       