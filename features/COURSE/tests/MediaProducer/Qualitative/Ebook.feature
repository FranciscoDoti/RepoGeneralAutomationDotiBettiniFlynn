@Course @Smoke @flaky @API
Feature: Verify that MediaProducer is able to add activities in Ebook

    @delete-Courses    
    Scenario: MediaProducer add the activities, Delete Activites, Create Folder in ebook(Qualitative Template)

       Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative Production Template     | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
        
                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "Qualitative Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | Appendix F            |    
          | Confidence Intervals  |

        And I add the activities in "E-book"
            | activities |
            | Glossary   |
            | Appendix F |

        Then I verify that activities are added in "E-book" and not in "Course Plan"
            | activities |
            | Glossary   |
            | Appendix F |

       When I add activities in "Course Plan" 
            | activities           |
            | Confidence Intervals |

        Then I verify that activities are added in CoursePlan and not in eBook
            | activities                    |
            | Confidence Intervals          |

         When I add the activities in both "Course Plan" and "E-book"
            | activities            | tab               |
            | Glossary              | CoursePlanEbook   |
            | Appendix F            | CoursePlanEbook   |
            | Confidence Intervals  | CoursePlanEbook   |

        Then I verify that activities are added both in "E-book" and "Course Plan" 
            | activities            |
            | Glossary              |
            | Appendix F            |
            | Confidence Intervals  |
        And I close the popup message

        When I create folder and add the activities to the folder in "E-book" in Production Tool 
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    | Appendix F             | Reading 1 folder      |
            | Reading 2    | Glossary               | Reading 2 folder      |
            | Reading 3    | Confidence Intervals   | Reading 3 folder      |

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 1     | Appendix F             |
            | Reading 2     | Glossary               |
            | Reading 3     | Confidence Intervals   |

        When I Reorder The folders in Production Tab 
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
            | Reading 3 |    movedownButton     |
      

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  1             |                                                       
            | Reading 2                                                         |  2             |
            | Reading 3                                                         |  3             |
        
           
        When I delete the folder in Production Tab 
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
   

        Then I verify that Folders are deleted
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |

        
