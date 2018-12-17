Feature: Create Template Courses

  @delete-course
  Scenario: Verify that a Media Producer is able to create a Qualitative Course
    Given I login to Achieve
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a course
      | page_object        | value                   |
      | course_type        | Course                  |
      | product_model      | Qualitative             |
      | learning_objective | Principles of Economics |
      | course_name        | Qualitative Course      |
      | course_code        | E2E 301                 |
      | course_status      | draft                   |
      | day                | Monday                  |
      | term               | Summer                  |
      | term_year          | 2019                    |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course's name "Qualitative Course" is listed on the courses page


  @delete-course
  Scenario: Verify that a Media Producer is able to create a Qualitative Template
    Given I login to Achieve
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a course
      | page_object        | value                   |
      | course_type        | Template                |
      | product_model      | Qualitative             |
      | learning_objective | Principles of Economics |
      | course_name        | Qualitative Template    |
      | course_code        | E2E 301                 |
      | isbn_number        | 9781464199498           |
      | course_status      | draft                   |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course "isbn" "9781464199498" is listed on the courses page
    And I verify that the course's name "Qualitative Template" is listed on the courses page


    @delete-course
    Scenario: Verify that a Media Producer is able to create a Quantitative Course
      Given I login to Achieve
      And I have logged in as "media_producer_2"
      And I click on "course" system "create_course" feature "button" element

      When I fill out the form to edit a course
        | page_object        | value                   |
        | course_type        | Course                  |
        | product_model      | Quantitative            |
        | learning_objective | Principles of Economics |
        | course_name        | Quantitative Course     |
        | course_code        | E2E 301                 |
        | course_status      | draft                   |
        | day                | Monday                  |
        | term               | Summer                  |
        | term_year          | 2019                    |

      Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
      And I verify that the course's name "Quantitative Course" is listed on the courses page


      @delete-course
      Scenario: Verify that a Media Producer is able to create a Quantitative Template
        Given I login to Achieve
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a course
          | page_object        | value                   |
          | course_type        | Template                |
          | product_model      | Quantitative            |
          | learning_objective | Principles of Economics |
          | course_name        | Quantitative Template   |
          | course_code        | E2E 301                 |
          | isbn_number        | 9781464199498           |
          | course_status      | draft                   |

        Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
        And I verify that the course "isbn" "9781464199498" is listed on the courses page
        And I verify that the course's name "Quantitative Template" is listed on the courses page


        @delete-course
        Scenario: Verify that a Media Producer is able to create a Read & Practice Course
          Given I login to Achieve
          And I have logged in as "media_producer_2"
          And I click on "course" system "create_course" feature "button" element

          When I fill out the form to edit a course
            | page_object   | value                  |
            | course_type   | Course                 |
            | product_model | Read & Practice        |
            | course_name   | Read & Practice Course |
            | course_code   | E2E 301                |
            | course_status | draft                  |
            | day           | Monday                 |
            | term          | Summer                 |
            | term_year     | 2019                   |

          Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
          And I verify that the course's name "Read & Practice Course" is listed on the courses page


          @delete-course
          Scenario: Verify that a Media Producer is able to create a Read & Practice Template
            Given I login to Achieve
            And I have logged in as "media_producer_2"
            And I click on "course" system "create_course" feature "button" element

            When I fill out the form to edit a course
              | page_object   | value                    |
              | course_type   | Template                 |
              | product_model | Read & Practice          |
              | course_name   | Read & Practice Template |
              | course_code   | E2E 301                  |
              | isbn_number   | 9781464199498            |
              | course_status | draft                    |

            Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
            And I verify that the course "isbn" "9781464199498" is listed on the courses page
            And I verify that the course's name "Read & Practice Template" is listed on the courses page


            @delete-course
            Scenario: Verify that a Media Producer is able to create a Skills Course
              Given I login to Achieve
              And I have logged in as "media_producer_2"
              And I click on "course" system "create_course" feature "button" element

              When I fill out the form to edit a course
                | page_object   | value         |
                | course_type   | Course        |
                | product_model | Skills        |
                | course_name   | Skills Course |
                | course_code   | E2E 301       |
                | course_status | draft         |
                | day           | Monday        |
                | term          | Summer        |
                | term_year     | 2019          |

              Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
              And I verify that the course's name "Skills Course" is listed on the courses page


              @delete-course
              Scenario: Verify that a Media Producer is able to create a Skills Template
                Given I login to Achieve
                And I have logged in as "media_producer_2"
                And I click on "course" system "create_course" feature "button" element

                When I fill out the form to edit a course
                  | page_object   | value           |
                  | course_type   | Template        |
                  | product_model | Skills          |
                  | course_name   | Skills Template |
                  | course_code   | E2E 301         |
                  | isbn_number   | 9781464199498   |
                  | course_status | draft           |

                Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
                And I verify that the course "isbn" "9781464199498" is listed on the courses page
                And I verify that the course's name "Skills Template" is listed on the courses page
