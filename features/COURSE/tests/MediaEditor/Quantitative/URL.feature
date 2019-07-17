@Course @Smoke
Feature: Verify that Media Editor is able to create URL

    @medieditor-delete-course
    Scenario: Verify that Media Editor is able to create a custom task with URL

       Given I login to Achieve-CW as "media_editor_1"
       When I create template with following data 
            | courseType  | productModel       | courseName             |  learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics       | E2E 301      | 9781464199498  | draft         |   
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