Feature: Read and Practice happy path workflow student

   Scenario: Student enrolls in course, verify that Student is able to attempt different kinds of activities such of a Instructor created read and practice course created from Read & Practice template then verify the grades
      Given I check E-mail Notification of "student" for "courseware"

      When I have logged in as "student_2"
      And I add the <activity> activity of type <type> to the "E2E301" course

      Then I validate the grades are displayed in gradebook for <activity> activity
      Examples:
      | activity                       | type       |
      | "read_and_practice_activity"   | "Quiz"     |
      | "learning_curve_activity"      | "Reading"  |
      | "file_activiy"                 | "Quiz"     |