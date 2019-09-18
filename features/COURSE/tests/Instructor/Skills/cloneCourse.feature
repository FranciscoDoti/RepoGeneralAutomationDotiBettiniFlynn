@Course @Smoke
Feature: Instructor attempts all the activities in Skills Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    @instructor-delete-course   
    Scenario: Verify that Instructor is able to copy course from Skills Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                     | activity                                      |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | LCRP1550612138614                             |
        And I click on home button to return to coursepage

        And I copy course from the "Skills Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 301              |

       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Skills Course" with the following data
            | field             | value                                     |
            | courseName        | Skills Instructor Course                  |
            | courseCode        | E2E 301                                   |

        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And  I verify that "Skills Instructor Course" is created with following data
            | field                 | value                                   |
            | courseCard            | Skills Instructor Course                |
            | Status                |  Draft                                  |
           
        

       
       
   