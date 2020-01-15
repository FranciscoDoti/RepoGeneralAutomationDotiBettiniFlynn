@Course @Smoke
Feature: Instructor adds folder, remove folder and reorders it in Qualitative Course

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Qualitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course 
                            

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |

        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Qualitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | Glossary                                                          |
        And I close the popup message
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | Glossary                                                          | moveToEnd      |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  1             |
            | Glossary                                                          |  2             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | folderName                |    message                                                                            |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | Assesment folder          |   'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |         
            | Glossary                                      | Reading           | Reading folder            |   'Glossary' was successfully moved to Reading.                                       |


        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | Glossary                                      | Reading           |


        When I delete the resources from the Template in "COURSE PLAN"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Assesment         | 'Assesment' has been removed.           |

        Then I verify that resources are deleted from Template in "COURSE PLAN"
            | folders           |
            | Reading           | 
            | Assesment         |



 
        