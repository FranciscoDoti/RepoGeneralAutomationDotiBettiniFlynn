@Course @Smoke @API 
Feature: Copy course Qualitative template

    @delete-Courses  
    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to copy a course from Qualitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative Template                | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
                  
        And I add activities to the content library of "Qualitative Template" template
          | name                                       |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
        
        And I click on "COURSE TEMPLATES" tab 

         And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301             |

        And I click on "COURSES" tab 

        Then I verify that "Qualitative Course" is created with following data
            | CourseName         | Status |
            | Qualitative Course | Draft  |
       
