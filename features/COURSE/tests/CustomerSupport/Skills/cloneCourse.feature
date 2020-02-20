@Course @Smoke
Feature: Customer Support attempts all the activities in Skills Production Template

    @customersupport-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Customer Support is able to create course from Skills Production Template
    
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
          | LC1551301608988       |
        
        And I click on back to course

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Skills Production Template" template with the following data
            | courseName                  | courseCode           |
            | Skills Production Course    | E2E 301              |
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"
       
        And I click on search button and input "Skills Production Template" to search the course
                
        And I copy course from the "Skills Production Template" template with the following data
            | courseName                  | courseCode           |
            | Skills CustomerCourse       | E2E 301              |

        And I search for "Skills CustomerCourse" in Courses tab

         Then I verify that "Skills CustomerCourse" is created with following data
            | CourseName               | Status                    |
            | Skills CustomerCourse    |  Draft                    |
           


        
        
           
        