
@Course @Smoke
Feature: Assigning the activities present in the course 

    @mediaproducer-delete-course
    Scenario: Verify that Instructor is able to assign the activities in the course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName                | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative IA Template  | Principles of Microeconomics      | E2E 317      | 9781464199457  | draft         |                      

        And I activate the "Quantitative IA Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Quantitative IA Template  |   E2E 317     |  Active On Date      | 


        And I add the activities in resources to "Quantitative IA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551317608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative IA Template" template with the following data
            | courseName              | courseCode           |
            | Quantitative IA Course  | E2E 317             |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative IA Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative IA Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative IA Course       |
            | courseCode        |  E2E 317                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Quantitative IA Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551317608988                                                   |
            | Glossary                                                          |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551317608988                                                  | 5      |
            | Glossary                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | Exercise: Misused words 1 (autoscored)                           | Open   | 
            | LC1551317608988                                                  | Open   |
            | Glossary                                                         | Open   |

