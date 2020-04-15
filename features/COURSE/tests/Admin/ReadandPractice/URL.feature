@Course @Smoke @API
Feature: Verify that Admin is able to create URL in Read and Practice Course 

    @delete-Courses
    Scenario: Verify that Admin is able to create a custom task with URL  in Read and Practice Course

       Given I login to Achieve-CW as "admin_1"
        When I create a course as "admin_1" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   |  warn_prebuilt | isbn             | template_version  |
            | Read & Practice URL Template        | E2E 301    | topics | draft  | 1                | true               | 0053B000001YyTMQA0  | template      |   false        |  9781464199499   |  1                |

                               
        And I click on search button and input "Read & Practice URL Template" to search the course

      
        And I click on "Read & Practice URL Template" card
        And I click on "Production" Tab

        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |


        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Google                                        |

        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Google                                        | 


       