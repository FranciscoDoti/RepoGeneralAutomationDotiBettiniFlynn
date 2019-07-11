@Course
@Smoke
Feature: Adding activities to the template

    @delete-mediaproducer-courses
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Read & Practice Template" template
            | type                    | activity                                      |
            | addButtonReadandpractice | LCRP1550612138614                            |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        Then I verify that activties are added
            | activity                                      |
            | LCRP1550612138614                             |    
            | LC1551301608988                               |
            |  Dedication                                   |            