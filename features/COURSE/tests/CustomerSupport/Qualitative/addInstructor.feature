@Course @Smoke
Feature: Adding Instructor to the Template

    @mediaproducer-delete-course
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName               | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative CS Template  | macmillan calculus     | E2E 306      | 9781464199470  | draft         |                      

        And I activate the "Qualitative CS Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Qualitative CS Template   |   E2E 306     |  Active On Date      | 


        And I add the activities in resources to "Qualitative CS Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551306608988                               |
            | addReadingButton        | Glossary                                      |

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative CS Template" template with the following data
            | courseName             | courseCode           |
            | Qualitative CS Course  | E2E 306              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative CS Course" course
        And I sign out of Achieve

        Then I verify that "Qualitative CS Course" is assigned to "instructor_1"

           