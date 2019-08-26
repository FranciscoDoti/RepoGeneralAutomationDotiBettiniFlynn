@Course @Smoke
Feature: Assigning the activities present in the course 

    @mediaproducer-delete-course
    Scenario: Verify that Instructor is able to assign the activities in the course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName               | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative IA Template  | macmillan calculus     | E2E 314      | 9781464199461  | draft         |                      


        And I activate the "Qualitative IA Template" template and add the following data 
            | courseName                |  courseCode   |  templateStatus      |
            | Qualitative IA Template   |   E2E 314     |  Active On Date      |     
            
        
        And I add the activities in resources to "Qualitative IA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551314608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative IA Template" template with the following data
            | courseName             | courseCode           |
            | Qualitative IA Course  | E2E 314              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative IA Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative IA Course" course with following data 
            | field             | value                           |
            | courseName        | Qualitative IA Course           |
            | courseCode        |  E2E 314                        |
            | templateStatus    |  Active On Date                 |

     
        And I add the activities in courseplanner to "Qualitative IA Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551314608988                                                   |
            | Glossary                                                          |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551314608988                                                  | 5      |
            | Glossary                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | Exercise: Misused words 1 (autoscored)                           | Open   | 
            | LC1551314608988                                                  | Open   |
            | Glossary                                                         | Open   |

