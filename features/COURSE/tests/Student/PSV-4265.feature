
Feature: Verify that Instructor is able to create a date range

    @mediaproducer-delete-course
    Scenario: Verify that student is able to enroll in course using Course Id and access code

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |

        And I activate the "activities Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | activities Template   |   E2E 301     |  Active On Date      |    

         And I add URL link to "activities Template" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |
        
        And I add the activities to the resource tab
            |  activities       | type              |
            | Dedication        | addReadingButton  |
            | AutomationAsset2  | addFileButton     |
            | Google            | addCCButton       |


        And I click on home button to return to coursepage
        And I copy course from the "activities Template" template with the following data
            | courseName            | courseCode           |
            | activities Course     | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "activities Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "activities Course" course with following data 
            | field             | value                        |
            | courseName        | activities Course            |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "activities Course" course
            | activity                                    | 
            | Google                                      |
            | Dedication                                  |
            | AutomationAsset2                            |

        #And I assign the activities in courseplanner
        #    | activity                                                         | Points |
        #    | Google                                                           | 5      |
        #    | Dedication                                                       | 5      |
        #    | AutomationAsset2                                                 | 5      |

        #And I create Gradebook Category for student and assign that to "Google" activity
        #    |   CategoryName        | DropGrade | GradebookCategory |
        #    |   Test                |  1        |   Test            |

        #Then I verify that "The details of 'Google' have been updated." message is displayed
        #And I close the popup message
        And I sign out of Achieve
#need to create a 7 day range

        #And I assign the activities in courseplanner
        #    | activity                                                         | Points | 
         #   | Exercise: Misused words 1 (autoscored)                           | 5      | 
         #   | LC1551301608988                                                  | 5      |
         #   | Glossary                                                       | 5      |

        #Then I verify that activities are assigned
        #    | activity                                                         | Status | 
        #    | Exercise: Misused words 1 (autoscored)                           | Open   | 
         #   | LC1551301608988                                                  | Open   |
        #    | Glossary                                                       | Open   |
#log in as student and take assignment