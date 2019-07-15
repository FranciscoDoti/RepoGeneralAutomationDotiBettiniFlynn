@Course @Smoke
Feature: Verify that Media EDitor is able to create URL

    @delete-mediaEditor-9781464199499
    Scenario: Verify that Media Editor is able to create a custom tsak with URL in Qual course

       Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel | courseName       | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | macmillan calculus     | E2E 301      | 9781464199498 | draft         |                      

        And I click on search button and input "Qualitative Template" to search the course

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add URL link to "Qualitative Template" 
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