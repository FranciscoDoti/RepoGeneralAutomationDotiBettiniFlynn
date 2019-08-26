@Course @Smoke
Feature: Verify that Instructor is able to create URL

   @mediaproducer-delete-course
    Scenario: Verify that mediaproducer is able to create a custom task with URL

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice IURL Template    |                  | E2E 323      | 9781464199450  | draft         |                     


        And I activate the "Read & Practice IURL Template" template and add the following data
            | courseName                     |  courseCode   |  templateStatus      |
            | Read & Practice IURL Template  |   E2E 323     |  Active On Date      | 

        And I copy course from the "Read & Practice IURL Template" template with the following data
            | courseName                   | courseCode           |
            | Read & Practice IURL Course  | E2E 323              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice IURL Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice IURL Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice IURL Course  |
            | courseCode        |  E2E 323                     |
            | templateStatus    |  Active On Date              |

        And I add URL link to "Read & Practice IURL Course" in coursePlanner
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add url link in courseplanner
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Google                                                              |