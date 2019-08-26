@Course @Smoke
Feature: Customer Support attempts all the activities in Quantitative CS CCTemplate

  @custmersupport-delete-course
    @mediaproducer-delete-course
    Scenario: Verify that Customer Support is able to create course from Quantitative CS CCTemplate
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                  | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative CS CCTemplate  | Principles of Microeconomics      | E2E 308      | 9781464199467  | draft         |   

        And I activate the "Quantitative CS CCTemplate" template and add the following data
            | courseName                  |  courseCode   |  templateStatus      |
            | Quantitative CS CCTemplate  |   E2E 308     |  Active On Date      | 


        And I add the activities in resources to "Quantitative CS CCTemplate" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551308608988                               |
            | addReadingButton        | Glossary                                      |
            | addButtonReadandpractice | LCRP1550612138614                            |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Quantitative CS CCTemplate" to search the course
                
        And I copy course from the "Quantitative CS CCTemplate" template with the following data
            | courseName               | courseCode           |
            | Quantitative CS CCCourse | E2E 308              |  

        And I click on search button and input "Quantitative CS CCCourse" to search the course
        
        Then I verify that "Quantitative CS CCCourse" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative CS CCCourse  |
            | courseDate            |  E2E 308                  |
           
        