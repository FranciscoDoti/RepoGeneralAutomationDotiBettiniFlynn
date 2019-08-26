@Course @Smoke
Feature: Adding Instructor to the Template

    @mediaproducer-delete-course
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                    |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice CSTemplate    |                  | E2E 309      | 9781464199466  | draft         |                      


        And I activate the "Read & Practice CSTemplate" template and add the following data
            | courseName                |  courseCode     |  templateStatus      |
            | Read & Practice CSTemplate  |   E2E 309     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice CSTemplate" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551309608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice CSTemplate" template with the following data
            | courseName                | courseCode           |
            | Read & Practice CSCourse  | E2E 309              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice CSCourse" course
        And I sign out of Achieve

        Then I verify that "Read & Practice CSCourse" is assigned to "instructor_1"

           