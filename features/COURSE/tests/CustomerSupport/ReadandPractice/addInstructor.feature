@Course @Smoke
Feature: Adding Instructor to the Template

    @mediaproducer-delete-course
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Read & Practice Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  Dedication                                   |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Template" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
<<<<<<< HEAD
            | courseCode        | E2E 301                       |
=======
            | courseCode        | E2E 301                      |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        And I sign out of Achieve

        Then I verify that "Read & Practice Course" is assigned to "instructor_1"

           