@Course @Smoke @flaky
Feature: Student grades
 
@mediaproducer-delete-course
@mediaproducer-delete-courseTemplate
Scenario: Verify that instructor is able to edit the grades of student

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199486  | draft         |

        And I close the popup message                      

        And I click on search button and input "activities Template" to search the course                     

        And I activate the "activities Template" template and add the following data
            | courseName            |  courseCode  |  templateStatus       |
            | activities Template   |   E2E 301     |  Active On Date      | 

        And I click on "activities Template" card
        And I click on "Production" Tab

        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |
        Then I verify that "URL Link Added to "Your Content"." message is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Google                                        |

        When I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
        
        And I add activities to "Content Library"
          | activities                                   |
          | Glossary                                     |
          | SampleChapterAuto.jpg                        |

        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "activities Template" template with the following data
            | courseName          | courseCode           |
            | activities Course   | E2E 301              |

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
            | SampleChapterAuto.jpg                       |
        
        And I close the popup message  

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | Google                                                           | 5      |
            | Glossary                                                         | 5      |
            | SampleChapterAuto.jpg                                            | 5      |

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

        And I attempt "Google" URL activity

        And I attempt "SampleChapterAuto.jpg" File activity

        And I complete the reading activity 
            | activity           |
            | Glossary           |

    
        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | SampleChapterAuto.jpg                         | Complete  |
    

        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | SampleChapterAuto.jpg                         | Complete  |

        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I edit student grade in "activities Course"
            | Students   | editGrade |
            | student_2  |  1        | 

        Then I verify the Grades
            | Students  | CourseTotal  | Google  | CategoryTotal | 
            | student_2 | 73%          | 20%     | 20%           | 