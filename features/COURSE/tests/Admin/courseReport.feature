Feature: Administrator Tools 

    @Smoke @Skip @localonly
    Scenario: Verify that Admin is able to download course report

        Given I login to Achieve-CW as "admin_1"
        When I generate and export course report 
        Then I verify the report is dowloaded with following data
            | ColumnName                    |
            | ISBN                          |
            | Parent ID                     |
            | Parent Name                   |
            | Type                          |
            | Restricted Access             |
            | Course ID                     |
            | Course Creation Date          |
            | Enrollment Start Date         |
            | Student Enrollments           |
            | LTI Gateway enabled           |
            | C-Account                     |
            | Product Model                 |
            | Assignments                   |
            | altp                          |
            | assessment                    |
            | instructorfile                |
            | lcrp                          |
            | learningcurve                 |
            | pathfinder                    |
            | reading                       |
            | reef                          |
            | staticfile                    |
            | url                           |
            | writing                       |
            