@Course @Smoke
Feature: Adding Instructor to the Template

    @mediaproducer-delete-course
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName          |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills CS Template  |                  | E2E 311      | 9781464199464  | draft         |                      


        And I activate the "Skills CS Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills CS Template        |   E2E 311     |  Active On Date      | 

        And I add the activities in resources to "Skills CS Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551311608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Skills CS Template" template with the following data
            | courseName          | courseCode           |
            | Skills CS Course    | E2E 311              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills CS Course" course
        And I sign out of Achieve

        Then I verify that "Skills CS Course" is assigned to "instructor_1"

           