@Course @Smoke
Feature: Customer Support attempts all the activities in Skills CS CCTemplate

   @custmersupport-delete-course
    @mediaproducer-delete-course
    Scenario: Verify that Customer Support is able to create course from Skills CS CCTemplate
    
        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName            |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills CS CCTemplate  |                  | E2E 312      | 9781464199463  | draft         |                      

        And I activate the "Skills CS CCTemplate" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills CS CCTemplate      |   E2E 312     |  Active On Date      | 

        And I add the activities in resources to "Skills CS CCTemplate" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551312608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | Automation Test                               |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Skills CS CCTemplate" to search the course
                
        And I copy course from the "Skills CS CCTemplate" template with the following data
            | courseName          | courseCode           |
            | Skills CS CCCourse  | E2E 312              |

        And I click on search button and input "Skills CS CCCourse" to search the course
        
        Then I verify that "Skills CS CCCourse" is created with following data
            | field                 | value                     |
            | courseName            | Skills CS CCCourse        |
            | courseDate            |  E2E 312                  |
           
        