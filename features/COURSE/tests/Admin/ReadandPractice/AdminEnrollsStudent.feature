@Course @Smoke
Feature: Admin enrolls the student in the course 

    @mediaproducer-delete-course
    Scenario: Verify that admin enrolls student in the course 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                        |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Admin Template    |                  | E2E 301      | 9781464199476  | draft         |                     

        And I activate the "Read & Practice Admin Template" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | Read & Practice Admin Template  |   E2E 301     |  Active On Date      | 


        And I add the activities in resources to "Read & Practice Admin Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | Automation Test                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Admin Template" template with the following data
            | courseName                    | courseCode          |
            | Read & Practice Admin Course  | E2E 301             |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Admin Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Admin Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Admin Course |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Read & Practice Admin Course" course
            | activity                                                          | 
            | Automation Test                                                 |                                                        
            | LC1551301608988                                                   |

        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Automation Test                                                | 5      | 
            | LC1551301608988                                                  | 5      | 

        And I sign out of Achieve
        And I login to Achieve-CW as "admin_1" 
        And I enroll the "student_1" in "Read & Practice Admin Course" course
        And I sign out of Achieve

        Then I verify that "Read & Practice Admin Course" is assigned to "student_1"
        And I sign out of Achieve 
    