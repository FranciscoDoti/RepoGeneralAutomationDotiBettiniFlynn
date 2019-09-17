@Course @Smoke
Feature: Assigning the activities present in Skills course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to assign the activities in Skills course

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |    
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Skills Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Skills Course" course
            | activity                                                          |                                                        
            | LC1551301608988                                                   |
            | GLOSSARY                                                          |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | LC1551301608988                                                  | 5      |
            | GLOSSARY                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status |  
            | LC1551301608988                                                  | Open   |
            | GLOSSARY                                                         | Open   |

