@Course @Smoke
Feature: Copy course from Read & Practice template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Copy a course from Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        Then I verify that "Read & Practice Course" is created with following data
            | field                 | value                     |
            | courseCard            | Read & Practice Course    |
            | Status                |  Draft                    |
          
           



