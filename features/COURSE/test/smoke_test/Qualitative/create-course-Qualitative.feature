Feature: Create Template for Qualitative 

@delete-all-courses
Scenario: Verify that a Media Producer is able to create a Qualitative Template
 
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
        | page_object                   | value                                       |
        | course_type                   | Template                                    |
        | product_model                 | Qualitative                                 |
        | course_name                   | Qualitative Template                        |
        | learning_objective            | Principles of Microeconomics                |
        | course_code                   | E2E 302                                     |
        | isbn_number                   | 1547659765741                               |
        | course_status                 | Draft                                       |
    Then I verify "course" system "create_course" feature "success_message" element's "create_course_Qualitative_success" message is displayed
    And I verify that the course "isbn" "1547659765741" is listed on the courses page
