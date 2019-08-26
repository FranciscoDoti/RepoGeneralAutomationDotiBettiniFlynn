@Course @Smoke
Feature: Copy course from the Template

    @mediaproducer-delete-course
    Scenario: Copy a course from the Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice MPcc Template    |                  | E2E 358      | 9781464199415  | draft         |                      


        And I activate the "Read & Practice MPcc Template" template and add the following data
            | courseName                     |  courseCode   |  templateStatus      |
            | Read & Practice MPcc Template  |   E2E 358     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice MPcc Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | Automation Test                               |     
            | addButtonLearningcurve    | LC1551358608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Read & Practice MPcc Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 358              |

        Then I verify that "Read & Practice Course" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Course    |
            | courseDate            |  E2E 358                  |
           



