@Course @Smoke
Feature: Copy course Quantitative Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Copy a course from Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

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
        
        And I click on "COURSES" tab 

        Then I verify that "Quantitative Course" is created with following data
            | CourseName            | Status                    |
            | Quantitative Course   |  Draft                    |
           



