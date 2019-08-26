@Course @Smoke
Feature: Adding Instructor to the Template

    @mediaproducer-delete-course
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                   | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative CS Template     | Principles of Microeconomics      | E2E 307      | 9781464199468  | draft         |   

        And I activate the "Quantitative CS Template" template and add the following data
            | courseName                   |  courseCode   |  templateStatus      |
            | Quantitative CS Template     |   E2E 307     |  Active On Date      | 


        And I add the activities in resources to "Quantitative CS Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551307608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative CS Template" template with the following data
            | courseName             | courseCode           |
            | Quantitative CS Course | E2E 307              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative CS Course" course
        And I sign out of Achieve

        Then I verify that "Quantitative CS Course" is assigned to "instructor_1"

           