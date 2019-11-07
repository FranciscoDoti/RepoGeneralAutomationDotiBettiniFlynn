@Course @Smoke
Feature: Instructor attempts all the activities in Skills Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    @instructor-delete-course   
    Scenario: Verify that Instructor is able to copy course from Skills Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      

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
          | LC1551301608988       |
        
        And I click on back to course

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Skills Production Template" template with the following data
            | courseName                  | courseCode           |
            | Skills Production Course    | E2E 301              |
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
        
         When I activate "Skills Course" course with following data 
            | field             | value               |
            | courseName        | Skills Course       |
            | courseCode        |  E2E 301            |
            | templateStatus    |  Active On Date     |

         And I create a single course from "Skills Template" with following data
            | field             | value                  |
            | courseName        | Skills Single Course   |
            | courseCode        |  E2E 301               |

        Then I verify that "Course Created." message is displayed
        And I verify that "Skills Single Course" is created

        