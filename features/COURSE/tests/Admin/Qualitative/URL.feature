@Course @Smoke @API
Feature: Verify that Admin is able to create URL

   @delete-Courses
    Scenario: Verify that Admin is able to create a custom tsak with URL in Qual course

       Given I login to Achieve-CW as "admin_1"
        When I create a course as "admin_1" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative URL Template            | E2E 301    | topics | draft  | 4                | true               | 0053B000001YyTMQA0  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199499   | 1                 |
                            

        And I click on search button and input "Qualitative URL Template" to search the course

        And I click on "Qualitative URL Template" card
        And I click on "Production" Tab

        And I add URL link to "Create"
            | field           | link                   |
            | addUrlLinkinput | https://www.google.com |

        Then I verify that "URL Link Added to "Your Content"." message is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity |
            | Google   |

        And I add custom activity to Content Library
            | activity |
            | Google   |

        Then I verify that activties are added in "Content Library"
            | activity |
            | Google   |


