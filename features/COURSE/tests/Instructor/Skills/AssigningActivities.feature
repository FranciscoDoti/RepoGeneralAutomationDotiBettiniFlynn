@Course @Smoke
Feature: Assigning the activities present in the course 

    @mediaproducer-delete-course
    Scenario: Verify that Instructor is able to assign the activities in the course

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName          |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills IA Template  |                  | E2E 324      | 9781464199449  | draft         |                      


        And I activate the "Skills IA Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills IA Template        |   E2E 324     |  Active On Date      |

        And I add the activities in resources to "Skills IA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551324608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Skills IA Template" template with the following data
            | courseName             | courseCode           |
            | Skills IA Course       | E2E 324              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills IA Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills IA Course" course with following data 
            | field             | value                        |
            | courseName        | Skills IA Course             |
            | courseCode        |  E2E 324                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Skills IA Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551324608988                                                   |
            | GLOSSARY                                                          |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551324608988                                                  | 5      |
            | GLOSSARY                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | Exercise: Misused words 1 (autoscored)                           | Open   | 
            | LC1551324608988                                                  | Open   |
            | GLOSSARY                                                         | Open   |

