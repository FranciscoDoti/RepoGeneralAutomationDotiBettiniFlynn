@Course @Smoke
Feature: Admin enrolls the student in the course 

    @mediaproducer-delete-course
    Scenario: Verify that admin enrolls student in the course 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |
                          


        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            

        And I click on home button to return to coursepage
        And I copy course from the "Skills Template" template with the following data
            | field             | value                        |
            | courseName        | Skills Course                |
<<<<<<< HEAD
            | courseCode        | E2E 301                       |
=======
            | courseCode        | E2E 301                      |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
<<<<<<< HEAD
            | courseName        | Skills Course          |
            | courseCode        |  E2E 301                      |
=======
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                     |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Skills Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |

        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551301608988                                                  | 5      | 

        And I sign out of Achieve
        And I login to Achieve-CW as "admin_1" 
        And I enroll the "student_1" in "Skills Course" course
        And I sign out of Achieve
    
        Then I verify that "Skills Course" is assigned to "student_1" 
    