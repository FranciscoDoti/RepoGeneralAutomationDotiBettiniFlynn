@Course @Smoke
Feature: Customer Support attempts all the activities in Skills Template

    @customersupport-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Customer Support is able to create course from Skills Template
    
        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Skills Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988 Automated Test                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | LCRP1550612138614 Automated Test                             |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I change to Course Template Tab
        And I click on search button and input "Skills Template" to search the course
                
        And I copy course from the "Skills Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 301              |

        And I search for "Skills Course" in Courses tab
        
        Then I verify that "Skills Course" is created with following data
            | CourseName            | Status                    |
            | courseCard            | Skills Course             |
            | Status                |  Draft                    |
           
        