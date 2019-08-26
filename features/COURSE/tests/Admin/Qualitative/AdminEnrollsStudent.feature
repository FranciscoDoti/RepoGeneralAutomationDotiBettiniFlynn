@Course @Smoke
Feature: Admin enrolls the student in the course 

    @mediaproducer-delete-course
    Scenario: Verify that admin enrolls student in the course 
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                  | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Admin Template  | macmillan calculus     | E2E 301      | 9781464199478  | draft         |                      

        And I activate the "Qualitative Admin Template" template and add the following data
            | courseName                   |  courseCode   |  templateStatus      |
            | Qualitative Admin Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Admin Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
        
        And I click on home button to return to coursepage
        And I copy course from the "Qualitative Admin Template" template with the following data
            | courseName                | courseCode           |
            | Qualitative Admin Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative Admin Course" course
        
        And I sign out of Achieve
        Given I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Admin Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Admin Course     |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Qualitative Admin Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |

        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551301608988                                                  | 5      | 

        And I sign out of Achieve
        And I login to Achieve-CW as "admin_1" 
        And I enroll the "student_1" in "Qualitative Admin Course" course
        And I sign out of Achieve 

        Then I verify that "Qualitative Admin Course" is assigned to "student_1"
        And I sign out of Achieve 

    