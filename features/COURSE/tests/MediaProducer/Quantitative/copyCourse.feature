@Course @Smoke @API
Feature: Copy course Quantitative Template

    @mediaproducer-delete-course
    @delete-Courses      
    Scenario: Copy a course from Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id             | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |  1                |               
   
                                                    
        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
        
        And I click on back to course
        And I click on home button to return to coursepage

        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 301             |
        
        And I click on "COURSES" tab 

        Then I verify that "Quantitative Course" is created with following data
            | CourseName            | Status                    |
            | Quantitative Course   |  Draft                    |
           



