Feature: Customer Support attempts all the activities in Quantitative
   #@delete-customersupport-courses
    Scenario: Verify that Customer Support is able to a create course from Quantitative Template

        Given I login to Achieve-CW as "customer_support_1"            
        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |
        And I sign out of Achieve

        Given I login to Achieve-CW as "instructor_1"
        Then I verify that "Quantitative Template" has created with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |

        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |
        And I sign out of Achieve

        Given I login to Achieve-CW as "media_producer_1"
        Then I verify that "Quantitative Template" has created with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |

        