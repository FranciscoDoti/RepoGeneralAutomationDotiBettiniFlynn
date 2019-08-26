@Course @Smoke
Feature: Customer Support attempts all the activities in Read & Practice CS CCTemplate

    @custmersupport-delete-course
    @mediaproducer-delete-course
    Scenario: Verify that Customer Support is able to create course from Read & Practice CS CCTemplate
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice CS CCTemplate    |                  | E2E 310      | 9781464199465  | draft         |                      

        And I activate the "Read & Practice CS CCTemplate" template and add the following data
            | courseName                     |  courseCode   |  templateStatus      |
            | Read & Practice CS CCTemplate  |   E2E 310     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice CS CCTemplate" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551310608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | LCRP1550612138614                             |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Read & Practice CS CCTemplate" to search the course
                
        And I copy course from the "Read & Practice CS CCTemplate" template with the following data
            | courseName                   | courseCode           |
            | Read & Practice CS CCCourse  | E2E 310              |

        And I click on search button and input "Read & Practice CS CCCourse" to search the course
        
        Then I verify that "Read & Practice CS CCCourse" is created with following data
            | field                 | value                         |
            | courseName            | Read & Practice CS CCCourse   |
            | courseDate            |  E2E 310                      |
           
        