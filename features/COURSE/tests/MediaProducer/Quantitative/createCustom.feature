
@Course @Smoke @Skip @API
Feature: Verify that media Producer is able to create Custom Task 

    @delete-Courses      
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template 
        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id             | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |  1                |               
   
                                                    
        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I create Custom Assesment Task in "Create" Tab
            | assessmentTitle    | assessmentType     | homeTaxonomy                       |
            | Quant Test         | Test/Quiz          | Interactive General Chemistry V1   | 
        And I click on "Production" Tab

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Quant Test                                    |

        When I add custom activity to Content Library
            | activity                                      |    
            | Quant Test                                    |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Quant Test                                    |
