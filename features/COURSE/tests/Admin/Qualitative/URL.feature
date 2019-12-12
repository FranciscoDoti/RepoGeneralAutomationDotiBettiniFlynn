@Course @Smoke @Skip
Feature: Verify that Admin is able to create URL

    @admin-delete-courseTemplate
    Scenario: Verify that Admin is able to create a custom tsak with URL in Qual course

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative URL Template  | macmillan calculus     | E2E 301      | 9781464199499  | draft         |

        And I close the popup message                      

        And I click on search button and input "Qualitative URL Template" to search the course

        And I activate "Qualitative URL Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Qualitative URL Template      |   E2E 301     |  Active On Date      |

        And I click on "Qualitative URL Template" card
        And I click on "Production" Tab

        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"." message is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Google                                        |

        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Google                                        | 


       