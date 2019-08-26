@Course @Smoke
Feature: Copy course from the Template

    @mediaproducer-delete-course
    Scenario: Copy a course from the Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills MPCC Template  |                   | E2E 364      | 9781464199408  | draft         |                     


        And I activate the "Skills MPCC Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills MPCC Template      |   E2E 364     |  Active On Date      |

        And I add the activities in resources to "Skills MPCC Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551364608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        And I click on home button to return to coursepage
        And I copy course from the "Skills MPCC Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 364              |

        Then I verify that "Skills Course" is created with following data
            | field                 | value                     |
            | courseName            | Skills Course             |
            | courseDate            |  E2E 364                  |
           



