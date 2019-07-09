Feature: Instructor attempts all the activities in Quantitative Template
       @delete-mediaproducer-courses
       @delete-instructor-courses
    Scenario: Verify that Instructor is able to copy course from Quantitative Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create Course Template with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Quantitative Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | About The Authors                             |
            | addButtonReadandpractice | LCRP1550612138614                             |
       
        And I sign out of Achieve
        
        And I login to Achieve-CW as "media_producer_2"
        And I click on search button and input "Quantitative Template" to search the course

        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Template2       |
            | courseCode        | E2E301                       |
      
        And I click on search button and input "Quantitative Template2" to search the course
        And I assign "instructor_1" to the "Quantitative Template2" course
       
        And I sign out of Achieve
        
        And I login to Achieve-CW as "instructor_1"
        And I create Course Template by coping from "Quantitative Template2" template
                        
        And Instructor copy course from the "Quantitative Template2" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Template        |
            | courseCode        | E2E301                       |

       
       
   