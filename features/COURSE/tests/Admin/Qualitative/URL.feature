@Course @Smoke
Feature: Verify that Admin is able to create URL

    @admin-delete-course
    Scenario: Verify that Admin is able to create a custom tsak with URL in Qual course

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative URL Template  | macmillan calculus     | E2E 301      | 9781464199499  | draft         |                      

        And I click on search button and input "Qualitative URL Template" to search the course

        And I activate the "Qualitative URL Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Qualitative Template      |   E2E 301     |  Active On Date      | 

        And I add URL link to "Qualitative URL Template" 
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