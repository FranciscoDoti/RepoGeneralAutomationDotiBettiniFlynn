@Course @Smoke
Feature: Copy course from the Template

    @mediaproducer-delete-course
    Scenario: Copy a course from the Template

      Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel      | courseName                 | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative MPCC Template  | macmillan calculus     | E2E 337      | 9781464199434  | draft         |                      

        And I activate the "Qualitative MPCC Template" template and add the following data
            | courseName                  |  courseCode   |  templateStatus      |
            | Qualitative MPCC Template   |   E2E 337     |  Active On Date      | 

        And I add the activities in resources to "Qualitative MPCC Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551337608988                               |
            | addReadingButton        |  Dedication                                   |

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative MPCC Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 337              |

        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Course        |
            | courseDate            |  E2E 337                  |
           



