@Course @Smoke @flaky
Feature: Adding collaborator to Read & Practice template 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |

        And I close the popup message                      

        And I click on search button and input "Read & Practice Template" to search the course

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      |                       

        And I click on "Read & Practice Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LC1551301608988       |
        
        And I click on back to course
    
        And I add "media_editor_1" as collaborator to "Read & Practice Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Read & Practice Template" is present and media editor has access to it has collaborator

        When I click on "Read & Practice Template" card
        And  I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Confidence Intervals  |
          | 17b. Psychopathology  |

        And I add the activities in both "Course Plan" and "E-book"
            | activities            | tab               |
            | 17b. Psychopathology  | CoursePlanEbook   |
            | Confidence Intervals  | CoursePlanEbook   |
        
        And I close the popup message

        And I create folder and add the activities to the folder in "Course Plan" in Production Tool
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    |  17b. Psychopathology  | Reading 1 folder      |
            | Reading 2    | Confidence Intervals   | Reading 2 folder      |

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 1     | 17b. Psychopathology   |
            | Reading 2     | Confidence Intervals   |

        






        








