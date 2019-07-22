@Smoke
Feature: Verify that Instructor is able to create URL

    @delete-mediaproducer-courses
    Scenario: Verify that mediaproducer is able to create a custom task with URL

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with the data
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I copy course from the "Skills Template" template with the following data
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        | E2E 301                       |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                      |
            | templateStatus    |  Active On Date              |

        And I add URL link to "Skills Course" in coursePlanner
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add url link in courseplanner
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Google                                                              |