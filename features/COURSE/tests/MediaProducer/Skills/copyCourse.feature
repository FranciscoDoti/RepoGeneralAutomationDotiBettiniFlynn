@Course @Smoke
Feature: Copy course from Skills template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Copy a course from Skills template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                     


        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Skills Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 301              |

        Then I verify that "Skills Course" is created with following data
            | field                 | value                     |
            | courseName            | Skills Course             |
            | courseDate            |  E2E 301                  |
           



