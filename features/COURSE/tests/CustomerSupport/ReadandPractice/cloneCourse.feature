@Course @Smoke
Feature: Customer Support attempts all the activities in Read & Practice Template

    @customersupport-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Customer Support is able to create course from Read & Practice Template
    
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
    
        And I click on search button and input "Read & Practice Template" to search the course
                
        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        And I search for "Read & Practice Course" in Courses tab
        
        Then I verify that "Read & Practice Course" is created with following data
            | CourseName                | Status                    |
            | Read & Practice Course    |  Draft                    |
           
        