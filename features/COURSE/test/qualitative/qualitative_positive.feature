Feature: Qualitative Positive feature

# @delete-course
  Scenario: Verify that a Media Producer is able to create a Qualitative Template
    Given I have opened "achieve" "login"
    And I click on "course" system "home" feature "sign_in" element

    When I login with the following credentials
        |username                                   | password       |
        |greeshma.reddy.contractor@macmillan.com    | Splended123$   |
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a course
        | page_object                   | value                                       |
        | course_type                   | Template                                    |
        | product_model                 | Qualitative                                 |
        | course_name                   | Qualitative Template                        |
        | learning_objective            | Principles of Microeconomics                |
        | course_code                   | E2E 302                                     |
        | isbn_number                   | 1547659765744                               |
        | course_status                 | Draft                                       |
    And I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course "isbn" "1547659765744" is listed on the courses page

    Then I verify the create_course data
        | page_object             | value                   |
        | edit_course_name        | Qualitative Template    |
        | edit_course_code        | E2E 302                 |
        | edit_isbn_number        | 1547659765744           |
    And I click on "course" system "create_course" feature "course_card" element 

    # Then I verify that it is redirected to "course_page" 

    And I add the activity to the course under the resources tab
        | activity                                                          | type              |
        | Monopolistice Competition                                         | assessment        |
        | Chapter 15. Monopolistic Competition and Product Differentiation  | learning_curve    |

    Then I verify activity list 
        | activity                                                          |
        | BR15: Bridge: Monopolistic Competition                            |
        | Chapter 15. Monopolistic Competition and Product Differentiation  |

    # And I sign out of Achieve
    # And I login to Achieve
    # And I have logged in as "instructor_7"

    # Given I have opened "achieve" "login"
    # And I click on "course" system "home" feature "sign_in" element

    # When I login with the following credentials
    #     |username            | password     |
    #     |baxoye@zsero.com    | ABCabc@123   |
    # And I click on "course" system "create_course" feature "course_card" element

    # Then I verify that it is redirected to "course_page" 
    
    # Then I click on courseplanner and I add custom content to the course 
    
    # Then I verify the activity list  
    #     | page_object                                 | value             | clear |
    #     | Atwood                                      | Reading           | true  |
    #     | Monopolistice Competition                   | Reading           | true  |
    #     | Table: The Lemonade Market                  | Qualitative       | true  |

    # And I click on "course" system "courseplanner" feature "Assign_assignment_button" element

    # Then I verify "course" system "courseplanner" feature "assignment_status" element is displayed

    # And I sign out of Achieve, log in as "student_positive", and attempt an "qualitative_activity"

    # Then I verify "course" system "courseplanner" feature "activity_content" element is displayed correctly