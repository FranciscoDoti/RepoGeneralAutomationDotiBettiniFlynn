@Course @Smoke @flaky
Feature: Instructor creates Master Section, creates Custom task and content to it

    @mediaproducer-delete-course
    @instructor-masterSection-delete-course
    @mediaproducer-delete-courseTemplate

    Scenario: Verify that Instructor is able to create a Master Section in Quantitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative      | Quantitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


         And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course 
                            

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template   |   E2E 301     |  Active On Date      | 

        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
          | LC1551301608988                            |
          | LCRP1550612138614                          |

        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I create a Master Section from "Quantitative Template" with following data
            | field             | value                        |
            | courseName        | Quantitative Master Course    |
            | courseCode        |  E2E 301                     |

        Then I verify that I created a Master Section with following data     
            | courseNameMS                   | Status                   | InstructorName    | MasterCode |
            |   Quantitative Master Course    | Draft Master Section     | instructor_1      | E2E 301    |