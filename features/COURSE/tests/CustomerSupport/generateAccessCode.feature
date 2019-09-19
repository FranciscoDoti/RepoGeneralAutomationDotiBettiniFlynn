Feature: Verify that customer Support is able to create access code for Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that customer Support is able to create access code for Template

         Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |

        And I activate the "Qualitative Template" template and add the following data
            | courseName            |  courseCode   |  templateStatus      |
            | Qualitative Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I click on "Course Templates" tab 
        And I copy course from the "Qualitative Template" template with the following data
            | courseName               | courseCode           |
            | Qualitative Course       | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I generate access code for "Qualitative Course"

        Then I verify that access code is generated

        When I update the access code
            | AccessCode   | Value      |
            | totalInput   | 2          |

        Then I verify that "Code update successful.." message is displayed 

        


