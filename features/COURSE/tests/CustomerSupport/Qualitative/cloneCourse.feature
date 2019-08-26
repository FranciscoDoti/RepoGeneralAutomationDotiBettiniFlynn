@Course @Smoke
Feature: Customer Support attempts all the activities in Qualitative CS CCTemplate

    @custmersupport-delete-course
    @mediaproducer-delete-course
    Scenario: Verify that Customer Support is able to create course from Qualitative CS CCTemplate
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                 | learningObjective      | courseCode    | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative CS CCTemplate  | macmillan calculus     | E2E 305       | 9781464199469  | draft         |                      

        And I activate the "Qualitative CS CCTemplate" template and add the following data
            | courseName                  |  courseCode    |  templateStatus      |
            | Qualitative CS CCTemplate   |   E2E 305      |  Active On Date      | 


        And I add the activities in resources to "Qualitative CS CCTemplate" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551305 608988                              |
            | addReadingButton        | Glossary                                      |
            | addButtonReadandpractice | LCRP1550612138614                            |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Qualitative CS CCTemplate" to search the course
                
        And I copy course from the "Qualitative CS CCTemplate" template with the following data
            | courseName               | courseCode           |
            | Qualitative CS CCCourse  | E2E 305              |

        And I click on search button and input "Qualitative CS CCCourse" to search the course
        
        Then I verify that "Qualitative CS CCCourse" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative CS CCCourse   |
            | courseDate            |  E2E 305                  |
           
        