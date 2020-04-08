 @Course @Smoke @API
 Feature: Update Qualitative template  
     
    @delete-Courses             
    Scenario: Verify that Media Producer is able to update Qualitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative Template                | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
  

                  
        And I click on "COURSE TEMPLATES" tab                    

        And I click on search button and input "Qualitative Template" to search the course                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 
            
        Then I verify that "Qualitative Template" is activated with following data
            | CourseName            | Status                    | ISBN                      |
            | Qualitative Template  | Active                    | 9781464199490             |