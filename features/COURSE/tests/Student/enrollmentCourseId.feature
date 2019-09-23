
@Smoke @localonly @Course
Feature: Student enrolls through course Id and access code

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that student is able to enroll in course using Course Id and access code

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                   |

        And I click on home button to return to coursepage
        And I click on "Course Templates" tab 
        And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"
        And I assign "instructor_1" to the "Qualitative Course" course
        And I sign out of Achieve

        When I login to Achieve-CW as "paid_access"

        And I generate "1" month length access code for "Qualitative Template"
        And I close generate access code
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I enroll "student_1" in the course using "Qualitative Course"

        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseCard            | Qualitative Course        |
            | courseStatus          |  Active                   |
          



     
        

    