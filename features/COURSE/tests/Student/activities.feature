@Smoke
Feature: Student attempts reading, static file, URL, Gradebook category

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199487  | draft         |

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

        And I assign "instructor_2" to the "activities Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_2"

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

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | Google                                                           | 5      |
            | Dedication                                                       | 5      |
            | AutomationAsset2                                                 | 5      |

        And I create Gradebook Category for student and assign that to "Google" activity
            |   CategoryName        | DropGrade | GradebookCategory |
            |   Test                |  1        |   Test            |

        Then I verify that "The details of 'Google' have been updated." message is displayed
        And I close the popup message
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_1" in "activities Course" course  
        And I sign out of Achieve

        And I login to Achieve-CW as "student_1"

        And I click on "activities Course"

        And I attempt "Google" URL activity

        And I attempt "AutomationAsset2" File activity

        And I complete the reading activity 
            | activity           |
            | Dedication         |

    
        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                      | status    |
            | Dedication                                    | Complete  |
            | Google                                        | Complete  |
            | AutomationAsset2                              | Complete  |

        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                      | status    |
            | Dedication                                    | Complete  |
            | Google                                        | Complete  |
            | AutomationAsset2                              | Complete  |

        Then I verify the assignmenent grades in gradebook for below assigned activities 
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Dedication                                    |   100%      | 5       | 50%                  |
            | Google                                        |   100%      | 5       | 33%                  |
            | AutomationAsset2                              |   100%      | 5       | 50%                  |

        And I verify Total Grades
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Test Total                                    | 100%        |   5     |   33%                |
            | Assignment Total                              | 100%        |   10    |   67%                |