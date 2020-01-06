@Course @Smoke
Feature: Verify side menu in Skills Course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    @instructor-delete-course
    Scenario: Verify that the side menu exist in a Skills Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName              | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills            | Skills Template         | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


         And I close the popup message                      

        And I click on search button and input "Skills Template" to search the course 
                            

        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      | 

        And I copy course from the "Skills Template" template with the following data
            | courseName            | courseCode           |
            | Skills Course         | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I create a single course from "Skills Template" with following data
            | field             | value                        |
            | courseName        | Skills Single Course         |
            | courseCode        |  E2E 301                     |

        And I verify that the side menu exist in "Skills Single Course"