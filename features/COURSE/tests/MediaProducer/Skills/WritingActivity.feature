@API
Feature: Media Producer creates writing activity in Skills Production Template

    @delete-Courses      
    Scenario: Verify that Instructor is able to create Custom Writing activity 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |
                                    
                                    
        And I click on "COURSE TEMPLATES" tab 

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I create "Skills Writing" custom activity in "Create" tab
        And I click on "Production" Tab

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Skills Writing                                |

        And I add custom activity to Content Library
            | activity                                      |    
            | Skills Writing                                |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Skills Writing                                |


            