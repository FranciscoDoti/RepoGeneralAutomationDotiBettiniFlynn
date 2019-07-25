@Course @Smoke
Feature: Copy course from the Template

    @mediaproducer-delete-course
    Scenario: Copy a course from the Template

      Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative Template" template with the following data
            | field             | value                        |
<<<<<<< HEAD
            | courseName        | Qualitative Course          |
            | courseCode        | E2E 301                       |

        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Course       |
            | courseDate            |  E2E 301                   |
=======
            | courseName        | Qualitative Course           |
            | courseCode        | E2E 301                      |

        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Course        |
            | courseDate            |  E2E 301                  |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8
           



