Feature: Read and Practice happy path workflow student

   Scenario: Student enrolls in course, verify that Student is able to attempt different kinds of activities such of a Instructor created read and practice course created from Read & Practice template then verify the grades
      Given I check E-mail Notification of "student" for "courseware"

      When I have logged in as "student_2"
      And I add the <activity> activity of type <type> to the <course> course

      Then I validate the grades are displayed in gradebook for <activity> activity
      Examples:
      | activity                       | type       | course   |
      | "read_and_practice_activity"   | "Quiz"     | "E2E301" |
      | "learning_curve_activity"      | "Reading"  | "E2E302" |
      | "file_activiy"                 | "Quiz"     | "E2E303" |