@Course @Smoke
Feature: Adding activities in Folder Resource Tab to Skills Production Template
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add activities in folder present in resource tab to Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course
        And I activate the "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      |                      

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
            | activities            |
            | Glossary              |
            | LCRP1550612138614     |
            | LC1551301608988       |

        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Glossary                                      |
            | LCRP1550612138614                             |
            | LC1551301608988                               |

        And I create folder and add the activities to the folder in "Content Library" 
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    |  Glossary              | Reading 1 folder      |
            | Reading 2    | LCRP1550612138614      | Reading 2 folder      |
            | Reading 3    | LC1551301608988        | Reading 3 folder      |
           

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 1     | Glossary               |
            | Reading 2     | LCRP1550612138614      |
            | Reading 3     | LC1551301608988        |
       

        When I Reorder The folders
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
            | Reading 3 |   moveToEnd           |
          

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  1             |                                                       
            | Reading 2                                                         |  2             |
            | Reading 3                                                         |  3             |
            

        When I delete the folder 
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            

        Then I verify that Folders are deleted
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
           

        