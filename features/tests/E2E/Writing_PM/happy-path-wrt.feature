Feature: R&P happy path workflow 2


Background:
        Given I have opened Achieve "loginURL"


     Scenario: As an instructor, login and mange the course settings and invite students
        When I have logged in as "instructor_2"
        And I click on open menu
        And I elect to edit the course named "$course1.name"
        When save the values to course  
            |values             | course|
            |Template_status    | Active On Date |
            |Active_Date        | @Date('now')   |
            |course_end_date    | @Date('+1m')   |
        And I elect to edit the course with the following data
                 #|courseStatus         | activeOnDate   | courseEndDate |saveBtn  |
                #| Active On Date      | @Date('now')   | @Date('+1m')  | Click   |
        And I click on open menu
        Then I capture the invite link and store to variable "inviteLink"
        Then I populate the Invite Students "student" page 
             #| inviteBtn | sendEmailBtn | emailList                     | cancelBtn | sendInvitesBtn |
             #| NA        | Click        | "$loginStudent1.email_address"| NA        | Click          |
        And I click on course card "Testcourse Writer's Help 3.0" template
        And I click on Resource tab
        And add content into chapter
        And I sign out of Achieve


