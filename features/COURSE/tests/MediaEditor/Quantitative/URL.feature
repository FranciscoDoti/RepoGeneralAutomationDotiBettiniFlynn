@Course @Smoke
Feature: Verify that Media Editor is able to create URL

    @delete-mediaEditor-9781464199499
    Scenario: Verify that Media Editor is able to create a custom task with URL

       Given I login to Achieve-CW as "media_editor_1"
        When I create "Quantitative Template" with ISBN "9781464199498" and course code "E2E 301" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |
        And I click on search button and input "Quantitative Template" to search the course

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add URL link to "Quantitative Template" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add URL activity in resource tab
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added 
            | activity                                                            | 
            | Google                                                              |

        And I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | Google                                                              |