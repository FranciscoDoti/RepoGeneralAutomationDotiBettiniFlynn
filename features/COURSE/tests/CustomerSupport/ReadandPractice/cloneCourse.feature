Feature: Customer Support attempts all the activities in Read & Practice Template

    @delete-ISBN-9781464199499
    Scenario: Verify that Customer Support is able to create course from Read & Practice Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Read & Practice Template" with the data
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Read & Practice Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | About The Authors                             |
            | addButtonReadandpractice | LCRP1550612138614                             |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Read & Practice Template" to search the course
                
        And I copy course from the "Read & Practice Template" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        | E2E301                       |

        And I click on search button and input "Read & Practice Course" to search the course
        
        Then I verify that "Read & Practice Course" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Course    |
            | courseDate            |  E2E301                   |
           
        