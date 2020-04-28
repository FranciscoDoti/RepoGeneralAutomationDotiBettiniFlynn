@SAC @Assessment @Regression @HomeWork @MultiModule
Feature: Validate the functionality of SAC Grading Matrix using HW Policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"

    Scenario: Two module question - Incorrect, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Square   | No           |
            | 2 Question | Numeric Entry   | 100      | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 2 Question | 0%    |

    Scenario: Two module question - one correct, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | square   | No           |
            | 2 Question | Numeric Entry   | 1000     | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 2 Question | 50%   |

    Scenario: Two module question - both correct, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Round    | No           |
            | 2 Question | Numeric Entry   | 10000    | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 2 Question | 100%  |

    Scenario: Two module question - Correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Square   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 2 Question | 0%    |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Round    | No           |
            | 2 Question | Numeric Entry   | 1000     | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 2 Question | 97.5% |

    Scenario: Three module question - 2 correct, then different 2 correct, then all correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 10       | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 66.7% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Square   | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 96.7% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 96.7% |

    Scenario: Three module question - 2 correct, then all correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 66.7% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 98.3% |

    Scenario: Three module question - 1 correct, then different 1 correct, then all correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 15       | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 33.3% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Square   | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 63.3% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 93.3% |

    Scenario: Three module question - 1 correct, then 2 correct, then all correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 15       | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 33.3% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type   | Response | Check Answer |
            | 3 Question | Numeric Entry | 100      | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 65%   |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Select | 20       | Yes          |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 95%   |

    Scenario: Three module question - 3 Incorrect, first time (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Triangle | No           |
            | 3 Question | Numeric Entry   | 15       | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 0%    |

    Scenario: Three module question - 1 correct, first time (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 15       | No           |
            | 3 Question | Multiple Select | 8        | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 33.3% |

    Scenario: Three module question - 2 correct, first time (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 66.7% |

    Scenario: Three module question - 3 correct, first time (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
            | 3 Question | Numeric Entry   | 100      | No           |
            | 3 Question | Multiple Select | 20       | No           |
            | 3 Question | Multiple Select | 40       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 3 Question | 100%  |

    Scenario: Four module question - Incorrect (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | No           |
            | 4 Question | Numeric Entry   | 15       | No           |
            | 4 Question | Multiple Select | 8        | No           |
            | 4 Question | Word Answer     | Na3SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 0%    |

    Scenario: Four module question - 1 correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 25%   |

    Scenario: Four module question - 2 correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 50%   |

    Scenario: Four module question - 3 correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Multiple Select | 60       | Yes          |

        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 75%   |

    Scenario: Four module question - 4 correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Multiple Select | 60       | No           |
            | 4 Question | Word Answer     | Na2SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 100%  |

    Scenario: Four module question - 1 correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 0%    |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 23.8% |

    Scenario: Four module question - 2 correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | No           |
            | 4 Question | Numeric Entry   | 15       | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Multiple Select | 60       | No           |
            | 4 Question | Word Answer     | Na2SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 50%   |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 97.5% |

    Scenario: Four module question - 3 correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | No           |
            | 4 Question | Numeric Entry   | 15       | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Word Answer     | Na2SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 25%   |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Multiple Select | 60       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 96.3% |

    Scenario: Four module question - 4 correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | No           |
            | 4 Question | Numeric Entry   | 15       | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Word Answer     | Na4SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 0%    |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Round    | No           |
            | 4 Question | Numeric Entry   | 1000     | No           |
            | 4 Question | Multiple Select | 30       | No           |
            | 4 Question | Multiple Select | 60       | No           |
            | 4 Question | Word Answer     | Na2SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 95%   |

    Scenario: Four module question - 1 correct, then 2 correct, 3 correct, then all correct (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Multimodule" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type | Response | Check Answer |
            | 4 Question | Word Answer | Na       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 25%   |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type   | Response | Check Answer |
            | 4 Question | Numeric Entry | 1000     | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 48.8% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Select | 60       | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 71.3% |
        And I click on "Action Button" "Try Again"
        And I provide the following responses
            | Question   | Module Type | Response | Check Answer |
            | 4 Question | Word Answer | Na2SO4   | Yes          |
        Then The questions should have the following grades
            | Question   | Grade |
            | 4 Question | 92.5% |