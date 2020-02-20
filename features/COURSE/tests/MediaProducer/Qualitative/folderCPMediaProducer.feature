@Course @Smoke 
Feature: Adding activities in Folder COURSE PLAN in Qualitative template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add folder in courseplanner in Qualitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9783464198498  | draft         |                      

        And I close the popup message 
        And I click on search button and input "Qualitative Template" to search the course                     

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
            | activities                                |
            | Glossary                                  |
            | Exercise: Misused words 1 (autoscored)    | 

        And I add activities in "Course Plan" 
            | activities                                |
            | Glossary                                  |
            | Exercise: Misused words 1 (autoscored)    | 

         Then I verify that activties are added in "Course Plan"
            | activity                                      |    
            | Glossary                                      |
            | Exercise: Misused words 1 (autoscored)        | 
        
        And I close the popup message

        And I create folder and add the activities to the folder in "Course Plan" in Production Tool 
            | Folder       | activities                                | PlaceFolder           |
            | Reading 1    |  Glossary                                 | Reading 1 folder      |
            | Reading 2    | Exercise: Misused words 1 (autoscored)    |  Reading 2 folder      |
           
           

        Then I verify that activities are added to the folder 
            | Folder        | activities                                |
            | Reading 1     | Glossary                                  |
            | Reading 2     | Exercise: Misused words 1 (autoscored)    | 
            
       

        When I Reorder The folders in Production Tab
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
          

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  2             |                                                       
            | Reading 2                                                         |  1             |

       