Feature: Instructor attempts all the activities in Quantitative Template
     
    Scenario: Verify that Instructor is able to copy course from Quantitative Template
    
    Given I login to Achieve-CW as "instructor_1"
        When I create Course Template by coping from "Quantitative Template2" template
                        
        And Instructor copy course from the "Quantitative Template2" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Template        |
            | courseCode        | E2E 301                      |