@Smoke @Course
Feature: Student attempts reading, static file, URL, Gradebook category


    Scenario: Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | activities Template    | Principles of Microeconomics      | E2E 301      | 9781464199432  | draft         |
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
          | activities                         |
          | GLOSSARY                           |
          | AutomationEpub-201910171217        |
          
        
        And I click on back to course
        And I click on home button to return to coursepage

        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "activities Template" template with the following data
            | courseName           | courseCode           |
            | activities Course    | E2E 301             |

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
        
    Scenario Outline: Students are enrolled and attempts the assignments

        Given I login to Achieve-CW as "customer_support_1" 
        When I enroll the <student> in "activities Course" course
        And I sign out of Achieve

        And I login to Achieve-CW as <student>

        And I click on "activities Course"

        And I attempt "Google" URL activity

        And I attempt "AutomationEpub-201910171217" File activity

        And I complete the reading activity 
            | activity           |
            | GLOSSARY           |
        
        And I sign out of Achieve

        Examples:
        |student        |
        |"student_1"    |
        |"student_2"    |

    Scenario: Instructor drops student and verifies completion

        Given I login to Achieve-CW as "instructor_2" 
        When I click on "activities Course"
        And I drop
            |Students    |
            |student_2  |
        And I navigate to gradebook and verify grades
            | activity                                      | percent   |
            | Google                                        | 100%      |
        And I sign out of Achieve

    Scenario: I delete the course and Template

        Given I login to Achieve-CW as "media_producer_2"
        And I click on "COURSE TEMPLATES" tab  
        And I delete "activities Template" and "activities Course"


   