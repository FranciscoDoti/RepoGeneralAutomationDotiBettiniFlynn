@Course @Smoke @Skip
Feature: Verify that Media Editor is able to create URL

    @medieditor-delete-course
    Scenario: Verify that Admin is able to create a custom task with URL

       Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
           | courseType  | productModel | courseName             |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills MEURL Template  |                  | E2E 334      | 9781464199438  | draft         |                      

        And I click on search button and input "Skills MEURL Template" to search the course

        And I activate the "Skills MEURL Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills MEURL Template     |   E2E 334     |  Active On Date      |

        And I add URL link to "Skills MEURL Template" 
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