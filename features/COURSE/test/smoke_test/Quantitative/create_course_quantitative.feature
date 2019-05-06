Feature: Create Template for Quantitative

@delete-all-courses
Scenario: Verify that a Media Producer is able to create a Qualitative Template
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
        | page_object                   | value                                       |
        | course_type                   | Template                                    |
        | product_model                 | Quantitative                                |
        | course_name                   | Quantitative Template                       |
        | learning_objective            | macmillan calculus                          |
        | course_code                   | E2E 303                                     |
        | isbn_number                   | 9036787554127                               |
        | course_status                 | Draft                                       |
    Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course "isbn" "9036787554127" is listed on the courses page