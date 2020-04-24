@Course @Smoke @flaky @API
Feature: Adding activities in Folder courseplanner in Quantitative Template

    @delete-Courses      
    Scenario: Verify that Media Producer is able to add folder in courseplanner in Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id             | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |  1                |               
   
        And I add activities to the content library of "Quantitative Template" template
            | name                  |
            | Glossary              |
            | LCRP1550612138614     |
            | LCRP1551301608988     |

        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab
        
        And I add activities in "Course Plan" 
            | activities            |
            | Glossary              |
            | LCRP1550612138614     |
            | LCRP1551301608988     |

         Then I verify that activties are added in "Course Plan"
            | activity                                      |    
            | Glossary                                      |
            | LCRP1550612138614                             |
            | LCRP1551301608988                             |
        And I close the popup message

        And I create folder and add the activities to the folder in "Course Plan" in Production Tool
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    |  Glossary              | Reading 1 folder      |
            | Reading 2    | LCRP1550612138614      | Reading 2 folder      |
            | Reading 3    | LCRP1551301608988      | Reading 3 folder      |
           

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 1     | Glossary               |
            | Reading 2     | LCRP1550612138614      |
            | Reading 3     | LCRP1551301608988      |
       

        When I Reorder The folders in Production Tab
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
            | Reading 3 |   moveToEnd           |
          

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  1             |                                                       
            | Reading 2                                                         |  2             |
            | Reading 3                                                         |  3             |
            

        When I delete the folder in Production Tab
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            

        Then I verify that Folders are deleted
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
           
