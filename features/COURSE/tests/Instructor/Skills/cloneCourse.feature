@Course @Smoke
Feature: Instructor attempts all the activities in Skills ICC Template

    @mediaproducer-delete-course
    @instructor-delete-course   
    Scenario: Verify that Instructor is able to copy course from Skills ICC Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName           |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills ICC Template  |                  | E2E 325      | 9781464199448  | draft         |                      


        And I activate the "Skills ICC Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills ICC Template       |   E2E 325     |  Active On Date      |

        And I add the activities in resources to "Skills ICC Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551325608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | Automation Test                               |
        And I click on home button to return to coursepage

        And I copy course from the "Skills ICC Template" template with the following data
            | courseName          | courseCode           |
            | Skills ICC Course   | E2E 325              |

       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills ICC Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Skills ICC Course" with the following data
            | field             | value                                     |
            | courseName        | Skills Instructor Course                  |
            | courseCode        | E2E 325                                   |

        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And  I verify that "Skills Instructor Course" is created with following data
            | field                 | value                                   |
            | courseName            | Skills Instructor Course                |
            | courseDate            |  E2E 325                                |
           
        

       
       
   