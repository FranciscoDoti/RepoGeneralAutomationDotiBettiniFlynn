@Course @Smoke @flaky @API
Feature: Adding collaborator to Read & Practice template 

    @delete-Courses      
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Read & Practice Template            | E2E 301    | topics | draft  | 1                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |               

                                                    
        And I click on "COURSE TEMPLATES" tab
        And I click on "Read & Practice Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LCRP1551301608988       |
        
        And I click on back to course
        And I add "media_editor_1" as collaborator to "Read & Practice Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Read & Practice Template" is present and media editor has access to it has collaborator

        When I click on "Read & Practice Template" card
        And  I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | LCRP1550612138614     |
          | Glossary              |

        And I add the activities in both "Course Plan" and "E-book"
            | activities            | tab               |
            | LCRP1550612138614     | CoursePlanEbook   | 
            | Glossary              | CoursePlanEbook   |
        
        And I close the popup message

        And I create folder and add the activities to the folder in "Course Plan" in Production Tool 
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    | LCRP1550612138614      | Reading 1 folder      |
            | Reading 2    | Glossary               | Reading 2 folder      |

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 1     | LCRP1550612138614      |
            | Reading 2     | Glossary               |