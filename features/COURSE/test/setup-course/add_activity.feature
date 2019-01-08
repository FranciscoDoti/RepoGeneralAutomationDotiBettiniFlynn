Feature: Qualitative Happy Path
  Media Producer creates a course

  Background:
    Given I have opened "achieve" "login"
    And I click on "course" system "home" feature "sign_in" element

    When I add Activities to course "isbn" "9781464199498"
      | activity        |
      | Homework        |
      | Animation       |
      | Analyzing Drama |
      | Dedication      |
      | new test epub   |
      | AT1nov          |

    Then I validate data table courses populate the list
