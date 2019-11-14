@Course @Smoke
Feature: Instructor creates Assessment custom task 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to create custom Assessment task in Quantitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course     

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LC1551301608988       |
        
        And I click on back to course
        And I click on home button to return to coursepage

        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 301             |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Quantitative Course" course
            | activity                                                          | 
            | LCRP1550612138614                                                 |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                          |

        And I close the popup message
        And I create a custom assessment task with following data
            | assessmentTitle    | assessmentType     | homeTaxonomy                       |
            | Quant Test         | Test/Quiz          | Interactive General Chemistry V1   |

        Then I verify that custom content task is added in "MY CONTENT" tab 
            |  activity       |
            |  Quant Test     |
        
        When I add custom content courseplanner
            | activity   |
            | Quant Test | 

        Then I verify that activties are added in courseplanner
            | activity   |
            | Quant Test | 



