@Course @Smoke
Feature: Verify side menu in Quantitative Course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    #@instructor-delete-course
    Scenario: Verify that the side menu exist in a Quantitative Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative      | Quantitative Template| macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


         And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course 
                            

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 

        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I create a single course from "Quantitative Template" with following data
            | field             | value                        |
            | courseName        | Quantitative Single Course   |
            | courseCode        |  E2E 301                     |

        And I verify that the side menu exist in "Quantitative Single Course"