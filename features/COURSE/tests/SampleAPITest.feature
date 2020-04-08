@Module @NameAPIBeingTested @TestSuiteType @TestGroupName
Feature: To verify the request and response from sample API

    @NamesofTheAPIBeingCalled @PriorityOfTest @ParameterSelections
    Scenario: Check if user is able to submit a GET API request
        Given I login to Achieve-CW as "admin_1"
        When I create a course as "media_producer_2" with the following data 
            | is_course_template | name                     | short_name | status | product_model_id | course_term | course_type | course_year | format |
            | true               | Qualitative URL Template 1| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |
        When I create a course as "media_producer_2" with the following data "admin_1" with the following data
            | is_course_template | name                     | short_name | status | product_model_id | course_term | course_type | course_year | format |
            | true               | Qualitative URL Template 2| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |
            | true               | Qualitative URL Template 3| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |

    Scenario: Check if user is able to submit a GET API request duplicate
        Given I login to Achieve-CW as "admin_1"
        When I create a course as "media_producer_2" with the following data 
            | is_course_template | name                     | short_name | status | product_model_id | course_term | course_type | course_year | format |
            | true               | Qualitative URL Template 1| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |
    When I create a course as "media_producer_2" with the following data 
            | is_course_template | name                     | short_name | status | product_model_id | course_term | course_type | course_year | format |
            | true               | Qualitative URL Template 2| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |
            | true               | Qualitative URL Template 3| E2E 301    | draft  | 1                | spring      | course      | 2019        | topics |
# | productModel      | learningObjective      | isbnNumber     |
# | Qualitative       | macmillan calculus     | 9781464199499  |

# @AllPossibleCombinations
# Scenario: verify the response

# Scenario: verify the reponse code

# @SelfContained
# Scenario: verify the duration 1

# @AvoidChaining
# Scenario: verify the duration 2

# @CallSequencing
# Scenario: verify the duration 3
