@Course @Smoke
Feature: Assigning the activities present in Read & Practice course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to assign the activities in the course in Read & Practice Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                       

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Read & Practice Course" course
            | activity                                                          | 
            | LCRP1550612138614                                                 |                                                        
            | LC1551301608988                                                   |
            | GLOSSARY                                                          |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | LCRP1550612138614                                                | 5      | 
            | LC1551301608988                                                  | 5      |
            | GLOSSARY                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | LCRP1550612138614                                                | Open   | 
            | LC1551301608988                                                  | Open   |
            | GLOSSARY                                                         | Open   |

