@Course @Smoke @flaky @API
Feature: Adding collaborator to the template in Quantitative Template

    @delete-Courses     
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   | 1                 |                

        And I add activities to the content library of "Quantitative Template" template
          | name                  |
          | Glossary              |
          | LCRP1550612138614     |
        
        And I add "media_editor_1" as collaborator to "Quantitative Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"
        

        Then I verify that "Quantitative Template" is present and media editor has access to it has collaborator

        And I verify that following tab are present 
            |   Tab            |
            |   Production     |
        