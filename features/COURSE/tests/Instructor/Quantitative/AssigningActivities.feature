
@Course @Smoke
Feature: Assigning the activities present in Quantitative course 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to assign the activities in Quantitative course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I add the activities in resources to "Quantitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 301             |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Quantitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                        |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551301608988                                                  | 5      |
            | Glossary                                                       | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | Exercise: Misused words 1 (autoscored)                           | Open   | 
            | LC1551301608988                                                  | Open   |
            | Glossary                                                       | Open   |

