@Course @Smoke
Feature: Instructor adds folder, remove folder and reorders it 

    @delete-mediaproducer-courses
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources 

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Template" with ISBN "9781464199498" and course code "E2E 301" 
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
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  Dedication                                   |
            | addButtonReadandpractice  | LCRP1550612138614                             |                         

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Template" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        | E2E301                       |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        |  E2E301                      |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Read & Practice Course" course
            | activity                                                          |                                                        
            | LC1551301608988                                                   |
            | Dedication                                                        |
            | LCRP1550612138614                                                 |
            
        And I reorder the resources on template in "coursePlanner"
            | actvities                                                         | reorder        |                                                    
            | LC1551301608988                                                   | movedownButton |
            | Dedication                                                        | moveToEnd      |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "coursePlanner"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | LC1551301608988                                                   |  2             |
            | Dedication                                                        |  3             |      

        And I add the activities to respective folders in "coursePlanner"
            | activity                                      | folders           | message                                                                             |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | Dedication                                    | Reading           | 'Dedication' was successfully moved to Reading.                                     |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "coursePlanner"
            | activity                                      | folders           |
            | LC1551301608988                               | Learning Curve    |
            | Dedication                                    | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

        When I delete the resources from the Template in "coursePlanner"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that resources are deleted from Template in "coursePlanner"
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | ReadandPractice   |



 
        