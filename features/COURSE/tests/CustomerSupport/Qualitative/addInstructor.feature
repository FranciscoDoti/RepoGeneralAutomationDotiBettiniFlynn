@Course @Smoke
Feature: Adding Instructor to the Template

    @delete-mediaproducer-courses
    Scenario:  Verify that customer support is able to add Instructor to a course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative Template" template with the following data
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        | E2E 301                      |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative Course" course
        And I sign out of Achieve

        Then I verify that "Qualitative Course" is assigned to "instructor_1"

           