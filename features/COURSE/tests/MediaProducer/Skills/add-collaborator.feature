@Course @Smoke @flaky @API
Feature: Adding collaborator to Skills Production Template

    @delete-Courses      
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |                

                                    
        And I click on "COURSE TEMPLATES" tab                         

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
        
        And I click on back to course
        And I add "media_editor_1" as collaborator to "Skills Production Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Skills Production Template" is present and media editor has access to it has collaborator

        And I verify that following tab are present 
            |   Tab            |
            |   Production     |
        