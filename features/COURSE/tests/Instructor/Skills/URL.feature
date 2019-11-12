@Course @Smoke
Feature: Verify that Instructor is able to create URL in Skills Production Course

   @mediaproducer-delete-course
   @mediaproducer-delete-courseTemplate
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Skills Production Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course
        And I activate the "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      |                         

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LC1551301608988       |
          | LCRP1550612138614     |
        
        And I click on back to course

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Skills Production Template" template with the following data
            | courseName                  | courseCode           |
            | Skills Production Course    | E2E 301              |
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Production Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Production Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Production Course     |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I add the activities in courseplanner to "Skills Production Course" course
            | activity                                                          |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                          |
            | LCRP1550612138614                                                 |

        And I close the popup message

        And I add URL link to "Skills Production Course" in coursePlanner
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add URL in courseplanner
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Google                                                              |