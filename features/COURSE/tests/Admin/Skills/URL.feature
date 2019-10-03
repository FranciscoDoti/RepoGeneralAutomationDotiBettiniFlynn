@Course @Smoke @Skip
Feature: Verify that Admin is able to create URL in Skill Course

    @admin-delete-courseTemplate
    Scenario: Verify that Admin is able to create a custom task with URL in Skill Course 

       Given I login to Achieve-CW as "admin_1"
        When I create template with following data 
           | courseType  | productModel | courseName           |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills URL Template  |                  | E2E 301      | 9781464199499  | draft         |

        And I close the popup message                  

        And I click on search button and input "Skills URL Template" to search the course

        And I activate "Skills URL Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills URL Template           |   E2E 301     |  Active On Date      |

        And I add URL link to "Skills URL Template" 
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