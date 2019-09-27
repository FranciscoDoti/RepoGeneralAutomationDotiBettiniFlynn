@Course @Smoke
Feature: Customer Support attempts all the activities in Quantitative Template

    @customersupport-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Customer Support is able to create course from Quantitative Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I add the activities in resources to "Quantitative Template" template
            | type                    | activity                                      |    
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        | Glossary                                      |
            | addButtonReadandpractice | LCRP1550612138614                            |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I change to Course Template Tab
        And I click on search button and input "Quantitative Template" to search the course
                
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course | E2E 301              |  

        And I search for "Quantitative Course" in Courses tab
        
        Then I verify that "Quantitative Course" is created with following data
            | courseName            | Status                    |
            | Quantitative Course   |  Draft                    |
           
        