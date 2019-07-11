@Course @Smoke
Feature: Instructor attempts all the activities in Qualitative Template

    @delete-mediaproducer-courses
    @delete-Instructor
    Scenario: Verify that Instructor is able to copy course from Qualitative Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Qualitative Template" with ISBN "9781464199498" and course code "E2E 301" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | courseCode        | E2E 301                      |
            | learningObjective | macmillan calculus           |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Qualitative Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | Dedication                                    |
            | addButtonReadandpractice | LCRP1550612138614                             |
        And I click on home button to return to coursepage

        And I copy course from the "Qualitative Template" template with the following data
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        | E2E301                       |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Qualitative Template" with the following data
            | field             | value                                  |
            | courseName        | Qualitative Instructor Course          |
            | courseCode        | E2E301                                 |

        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Qualitative Instructor Course" is created with following data
            | field                 | value                                |
            | courseName            | Qualitative Instructor Course        |
            | courseDate            |  E2E301                              |
           
        

       
       
   