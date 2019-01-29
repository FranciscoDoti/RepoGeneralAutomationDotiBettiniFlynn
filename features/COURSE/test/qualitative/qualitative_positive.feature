@delete-course
  Scenario: Verify that a Media Producer is able to create a Qualitative Template
    Given I login to Achieve
    And I have logged in as "media_producer_positive"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a course
        | page_object                   | value                                       |
        | course_type                   | Template                                    |
        | product_model                 | Qualitative                                 |
        | course_name                   | Qualitative Template                        |
        | learning_objective_framework  | Principles of Microeconomics                |
        | course_code                   | E2E 302                                     |
        | meeting_times                 | monday                                      |
        | term                          | Spring 2019                                 |
        | isbn_number                   | 1547659765742                               |
        | course_status                 | Active on Date                              |
        | course_end_date               | March 27 2019                               |
    And I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course "isbn" "1547659765742" is listed on the courses page

    Then I verify the course_list data
        | page_object             | value             |
        | course_name             | Edit Testcourse   |
        | course_name_course_code | E2E 301           |
        | course_name_isbn        | 9781464199498     |
    And I click on "course" system "create_course" feature "course_card" element 

    Then I verify that it is redirected to "course_page" 

    And I add the <activity> activity to the course under the resources tab
    Examples: 
        | activity                   |
        | Sequence of Events         |
        | Monopolistice Competition  |

    Then I verify activity list 
        | page_object                                 |  value             | clear |
        | Atwood                                      |  Reading           | true  |
        | Monopolistice Competition                   |  Reading           | true  |

    And I sign out of Achieve
    And I have logged in as "instructor_positive"
    And I click on "course" system "create_course" feature "course_card" element

    Then I verify that it is redirected to "course_page" 
    
    Then I click on courseplanner and I add custom content to the course 
    
    Then I verify the activity list  
        | page_object                                 | value             | clear |
        | Atwood                                      | Reading           | true  |
        | Monopolistice Competition                   | Reading           | true  |
        | Table: The Lemonade Market                  | Qualitative       | true  |

    And I click on "course" system "courseplanner" feature "Assign_assignment_button" element

    Then I verify "course" system "courseplanner" feature "assignment_status" element is displayed

    And I sign out of Achieve, log in as "student_positive", and attempt an "qualitative_activity"

    Then I verify "course" system "courseplanner" feature "activity_content" element is displayed correctly