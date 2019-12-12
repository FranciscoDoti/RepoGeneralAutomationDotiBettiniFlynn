@Smoke @Course
Feature: Student attempts reading, static file, URL, Gradebook category 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199486  | draft         |

       
        And I close the popup message                      

        And I click on search button and input "activities Template" to search the course     

        And I activate the "activities Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | activities Template    |   E2E 301     |  Active On Date      | 


        And I click on "activities Template" card
        And I click on "Production" Tab
        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |
        And I click on go to your content
        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
        And I add activities to "Content Library"
          | activities            |
          | GLOSSARY              |
          | AutomationEpub-201910171217        |
          
        
        And I click on back to course
        And I click on home button to return to coursepage

        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "activities Template" template with the following data
            | courseName           | courseCode           |
            | activities Course    | E2E 301             |

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
            | GLOSSARY                                    |
            | AutomationEpub-201910171217                 |
        And I close the popup message

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | Google                                                           | 5      |
            | GLOSSARY                                                         | 5      |
            | AutomationEpub-201910171217                                      | 5      |

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

        And I attempt "AutomationEpub-201910171217" File activity

        And I complete the reading activity 
            | activity           |
            | GLOSSARY           |

    
        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                      | status    |
            | GLOSSARY                                      | Complete  |
            | Google                                        | Complete  |
            | AutomationEpub-201910171217                   | Complete  |
        
        And I see assignments due in the next 7 days on the course Plan tab

        And I do not see assignments more than 7 days out on the course plan tab
    
        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                      | status    |
            | GLOSSARY                                      | Complete  |
            | Google                                        | Complete  |
            | AutomationEpub-201910171217                   | Complete  |

        And I verify the assignmenent grades in gradebook for below assigned activities 
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | GLOSSARY                                      |   100%      | 5       | 50%                  |
            | Google                                        |   100%      | 5       | 100%                 |
            | AutomationEpub-201910171217                   |   100%      | 5       | 50%                  |

        And I verify Total Grades
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Test Total                                    | 100%        |   5     |   33%                |
            | Assignments Total                             | 100%        |   10    |   67%                |