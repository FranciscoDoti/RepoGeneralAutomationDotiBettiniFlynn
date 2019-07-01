Feature: Copy course from the Template

    @delete-mediaproducer-courses
    Scenario: Copy a course from the Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Template" with the data 
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
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  About The Authors                            |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Template" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        | E2E301                       |

        Then I verify that "Read & Practice Course" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Course    |
            | courseDate            |  E2E301                   |
           



