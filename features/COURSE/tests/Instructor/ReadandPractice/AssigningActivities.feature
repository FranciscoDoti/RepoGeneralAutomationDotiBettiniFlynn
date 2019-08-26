@Course @Smoke
Feature: Assigning the activities present in the course 

    @mediaproducer-delete-course
    Scenario: Verify that Instructor is able to assign the activities in the course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                     |  learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice IA Template    |                    | E2E 320      | 9781464199453  | draft         |                       

        And I activate the "Read & Practice IA Template" template and add the following data
            | courseName                   |  courseCode   |  templateStatus      |
            | Read & Practice IA Template  |   E2E 320     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice IA Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | Automation Test                               |     
            | addButtonLearningcurve    | LC1551320608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice IA Template" template with the following data
            | courseName                 | courseCode           |
            | Read & Practice IA Course  | E2E 320              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice IA Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice IA Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice IA Course    |
            | courseCode        |  E2E 320                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Read & Practice IA Course" course
            | activity                                                          | 
            | Automation Test                                                   |                                                        
            | LC1551320608988                                                   |
            | GLOSSARY                                                          |


        And I assign the activities in courseplanner
            | activity                                                          | Points | 
            | Automation Test                                                   | 5      | 
            | LC1551320608988                                                   | 5      |
            | GLOSSARY                                                          | 5      |

        Then I verify that activities are assigned
            | activity                                                          | Status | 
            | Automation Test                                                   | Open   | 
            | LC1551320608988                                                   | Open   |
            | GLOSSARY                                                          | Open   |

