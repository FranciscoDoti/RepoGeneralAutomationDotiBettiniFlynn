Feature: Create Template for Read and Practice

  @delete-course
  Scenario: Verify that Media Producer able to create Read and Practice Template
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
      | page_object   | value                    |
      | course_type   | Template                 |
      | product_model | Read & Practice          |
      | course_name   | Read & Practice Template |
      | course_code   | E2E 301                  |
      | isbn_number   | 9781464199411            |
      | course_status | draft                    |


    Then I verify "course" system "create_course" feature "success_message" element's "craete_course_reading_success" message is displayed
    And I verify that the course's name "Read & Practice Template" is listed on the courses page