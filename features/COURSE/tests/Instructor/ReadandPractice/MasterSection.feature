@Course @Smoke
Feature: Instructor creates Master Section, creates Custom task and content to it

    @mediaproducer-delete-course
    @instructor-masterSection-delete-course
    @mediaproducer-delete-courseTemplate

    Scenario: Verify that Instructor is able to create a Master Section in Read and Practice Course

        Given I login to Achieve-CW as "media_producer_2"
        
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         | 
         And I close the popup message                      

        And I click on search button and input "Read & Practice Template" to search the course 
                            

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Read & Practice Template   |   E2E 301     |  Active On Date      | 

        And I click on "Read & Practice Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | LC1551301608988                            |
          | LCRP1550612138614                          |

        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I create a Master Section from "Read & Practice Template" with following data
            | field             | value                            |
            | courseName        | Read & Practice Master Course    |
            | courseCode        |  E2E 301                         |

        Then I verify that I created a Master Section with following data     
            | courseNameMS                       | Status                   | InstructorName    | MasterCode |
            |   Read & Practice Master Course    | Draft Master Section     | instructor_1      | E2E 301    |