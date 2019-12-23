@Course @Smoke
Feature: Single Read & Practice Course

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate   
    @instructor-delete-course
    Scenario: Verify that Instructor is able to copy course from Read & Practice Template
    
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
          | GLOSSARY              |
          | LCRP1550612138614     |
          | LC1551301608988       |
          
        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 

        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

         And I create a single course from "Read & Practice Template" with following data
            | field             | value                           |
            | courseName        | Read & Practice Single Course   |
            | courseCode        |  E2E 301                        |

        Then I verify that "Course Created." message is displayed
        And I verify that "Read & Practice Single Course" is created
