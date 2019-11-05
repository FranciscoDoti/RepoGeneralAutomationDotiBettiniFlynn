@Smoke @Course
Feature: Student attempts reading, static file, URL, Gradebook category


    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199486  | draft         |

        And I activate the "activities Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | activities Template   |   E2E 301     |  Active On Date      |    

         And I add URL link to "activities Template" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |
        
        And I add the activities to the resource tab
            | activities                             | type                      |
            | Glossary                               | addReadingButton          |
            | AutomationAsset2                       | addFileButton             |
            | Google                                 | addCCButton               |
            | Exercise: Misused words 1 (autoscored) | addButtonAssessment       |


        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 

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
            | Glossary                                    |
            | AutomationAsset2                            |
            | Exercise: Misused words 1 (autoscored)      |  

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | Google                                                           | 5      |
            | Glossary                                                         | 5      |
            | AutomationAsset2                                                 | 5      |
            | Exercise: Misused words 1 (autoscored)                           | 5      |

        And I create Gradebook Category for student and assign that to "Google" activity
            |   CategoryName        | DropGrade | GradebookCategory |
            |   Test                |  1        |   Test            |

        Then I verify that "The details of 'Google' have been updated." message is displayed
        And I close the popup message
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_2" in "activities Course" course  
        And I sign out of Achieve

        And I login to Achieve-CW as "student_2"

        And I click on "activities Course"

        And I attempt "Exercise: Misused words 1 (autoscored)" premade assesment in "Quantitative Course"
            | Questions   |  PremadeAssesmentKey                                                                                                       |   
            | 1 Question  |  Because Anne Tyler often writes about family loyalties, her allusions to King Lear are not surprising.                    |  
            | 2 Question  |  Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.         | 
            | 3 Question  |  The Keweenaw Peninsula is bordered on three sides by Lake Superior.                                                       |         
            | 4 Question  |  At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                                |   
            | 5 Question  |  The person who complained to the human resources manager wishes to remain anonymous.                                      |


        And I attempt "Google" URL activity

        And I attempt "AutomationAsset2" File activity

        And I complete the reading activity 
            | activity           |
            | Glossary           |

    
        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | AutomationAsset2                              | Complete  |
            | Exercise: Misused words 1 (autoscored)        | Complete  |
    

        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | AutomationAsset2                              | Complete  |
            | Exercise: Misused words 1 (autoscored)        | Complete  |

    Scenario: Verify that student see correct assignments grids

        When I login to Achieve-CW as "student_1"

        Then I see assignments due in the next 7 days on the course Plan tab

        Then I do not see assignments more than 7 days out on the course plan tab

    Scenario: Verify that student is able to see Grades in Gradebook 

        When I login to Achieve-CW as "student_2"

        And I click on "activities Course"

        Then I verify the assignmenent grades in gradebook for below assigned activities 
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Glossary                                      |   100%      | 5       | 33%                  |
            | Google                                        |   100%      | 5       | 100%                 |
            | AutomationAsset2                              |   100%      | 5       | 33%                  |
            | Exercise: Misused words 1 (autoscored)        |   100%      | 5       | 33%                  |

        And I verify Total Grades
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Test Total                                    | 100%        |   5     |   25%                |
            | Assignments Total                             | 100%        |   15    |   75%                |