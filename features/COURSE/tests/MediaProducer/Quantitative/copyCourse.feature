@Course @Smoke
Feature: Copy course from the Template

    @mediaproducer-delete-course
    Scenario: Copy a course from the Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                  | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative MPCC Template  | Principles of Microeconomics      | E2E 347      | 9781464199425  | draft         |   

        And I activate the "Quantitative MPCC Template" template and add the following data
            | courseName                  |  courseCode   |  templateStatus      |
            | Quantitative MPCC Template  |   E2E 347     |  Active On Date      | 


        And I add the activities in resources to "Quantitative MPCC Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551347608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative MPCC Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 347             |

        Then I verify that "Quantitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative Course       |
            | courseDate            |  E2E 347                  |
           



