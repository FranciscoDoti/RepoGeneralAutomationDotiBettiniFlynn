@Course @Smoke @API
Feature: Copy course from Skills Production Template

    @mediaproducer-delete-course
    @delete-Courses      
    Scenario: Copy a course from Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |
                                    
        And I click on "COURSE TEMPLATES" tab                          
        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1551301608988     |
        
        And I click on back to course

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Skills Production Template" template with the following data
            | courseName                  | courseCode           |
            | Skills Production Course    | E2E 301              |
        
        And I click on "COURSES" tab 

        Then I verify that "Skills Production Course" is created with following data
            | CourseName                        | Status                    |
            | Skills Production Course          |  Draft                    |
           



