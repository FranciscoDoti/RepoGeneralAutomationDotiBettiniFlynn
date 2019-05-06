Feature: Verify that Admin is able to create URL


    Scenario: Verify that Admin is able to create a custom tsak with URL in Qual course

        Given I click login to the Achieve product
        And I have logged in as "admin_1"
        And I click on "course" system "create_course" feature "plus_button" element

        When I fill out the form to edit a new course
            | page_object        | value                        |
            | course_type        | Template                     |
            | product_model      | Qualitative                  |
            | learning_objective | Principles of Economics      |
            | course_name        | Qualitative Template TC      |
            | course_code        | E2E 302                      |
            | isbn_number        | 9039532434861                |
            | course_status      | draft                        |
        And I close the popup message
        And I click on "course" system "course_list" feature "search" element "Qualitative Template TC" input

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Template Tc                                     |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I close the popup message
        And I click on "course" system "course_list" feature "search" element "Qualitative Template TC" input

         And I click on create custom button to add URL link 
            | Pagedef           | link                     |
            | add_url_link      | http://www.cnn.com       |

        When I click on "course" system "resources_page" feature "goTocontent" element

        And I add custom made activities in resource tab
            | activity                                    |
            | CNN - Breaking News, Latest News and Videos |

        Then I verify the activity list in resource tab 
            | activity                                                            | 
            | CNN - Breaking News, Latest News and Vid ...                        |

        And I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | URL Link                                                            |

        And I "sign_out" of Achieve
            

    
        
        
         



        


        