@Course @Smoke
Feature: Instructor attempts all the activities in Read & Practice Template

    @delete-mediaproducer-courses   
    @delete-Instructor
    Scenario: Verify that Instructor is able to copy course from Read & Practice Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Read & Practice Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Read & Practice Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | Dedication                                    |
            | addButtonReadandpractice | LCRP1550612138614                             |
        And I click on home button to return to coursepage

        And I copy course from the "Read & Practice Course" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        | E2E301                       |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Read & Practice Template" with the following data
            | field             | value                                     |
            | courseName        | Read & Practice Instructor Course         |
            | courseCode        | E2E301                                    |
         
        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Read & Practice Instructor Course" is created with following data
            | field                 | value                                   |
            | courseName            | Read & Practice Instructor Course       |
            | courseDate            |  E2E301                                 |
           
        

       
       
   