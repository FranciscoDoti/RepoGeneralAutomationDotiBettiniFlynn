@Course
Feature: Customer Support attempts all the activities in Skills Template

    @delete-customerSupport-9781464199499
    Scenario: Verify that Customer Support is able to create course from Skills Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Skills Template" with ISBN "9781464199498"
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Skills Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | Dedication                                    |
            | addButtonReadandpractice | LCRP1550612138614                             |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Skills Template" to search the course
                
        And I copy course from the "Skills Template" template with the following data
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        | E2E301                       |

        And I click on search button and input "Skills Course" to search the course
        
        Then I verify that "Skills Course" is created with following data
            | field                 | value                     |
            | courseName            | Skills Course             |
            | courseDate            |  E2E301                   |
           
        