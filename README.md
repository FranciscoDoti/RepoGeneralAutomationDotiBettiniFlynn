## GitHub
[Link](https://github.com/ronasher/bb-cucumber-js.git)
[WebDriver Cheat Sheet](https://gist.github.com/huangzhichong/3284966)



#config.json
Update the environment, execution mode, execution browser, screenshots requirement and timeout in the config.json file under config/config.json



#urls.json
Add any urls required based on the application and target environment.

# Testing via feature files
1. [Cucumber and Gherkin](https://www.sitepoint.com/bdd-javascript-cucumber-gherkin/)
2. [Reliable Tests](https://medium.freecodecamp.org/how-to-write-reliable-browser-tests-using-selenium-and-node-js-c3fdafdca2a9)
3. [Just Enough Regular Expressions for Cucumber](https://agileforall.com/just-enough-regular-expressions-for-cucumber/)



# Run a specific feature file
```
node_modules/cucumber/bin/cucumber-js features/main/login_failed.feature
```
config.json should be updated with environmemt details before the run.



## Run subdirectories
[Example directory structure](https://makandracards.com/makandra/4971-how-to-organize-and-execute-cucumber-features-e-g-in-subdirectories)



# Windows package.json, for scripts:  npm run test-dev
```
"test-dev": "node ./node_modules/cucumber/bin/cucumber-js"
```

# Important Selenium Classes
[until](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html)

# Testing Strategies
[Exmaple testing strategies](http://www.seleniumeasy.com/selenium-tutorials/selenium-locators)


# Wait on Page load  (arrrrggggghhhhhh)
[Why is it so HARD](https://stackoverflow.com/questions/10720325/selenium-webdriver-wait-for-complex-page-with-javascriptjs-to-load)
```
up vote
56
down vote
accepted
If anyone actually knew a general and always-applicable answer, it would have been implemented everywhere ages ago and would make our lives SO much easier.

There are many things you can do, but every single one of them has a problem:

As Ashwin Prabhu said, if you know the script well, you can observe its behaviour and track some of its variables on window or document etc. This solution, however, is not for everyone and can be used only by you and only on a limited set of pages.

Your solution by observing the HTML code and whether it has or hasn't been changed for some time is not bad (also, there is a method to get the original and not-edited HTML directly by WebDriver), but:

It takes a long time to actually assert a page and could prolong the test significantly.
You never know what the right interval is. The script might be downloading something big that takes more than 500 ms. There are several scripts on our company's internal page that take several seconds in IE. Your computer may be temporarily short on resources - say that an antivirus will make your CPU work fully, then 500 ms may be too short even for a noncomplex scripts.
Some scripts are never done. They call themselves with some delay (setTimeout()) and work again and again and could possibly change the HTML every time they run. Seriously, every "Web 2.0" page does it. Even Stack Overflow. You could overwrite the most common methods used and consider the scripts that use them as completed, but ... you can't be sure.
What if the script does something other than changing the HTML? It could do thousands of things, not just some innerHTML fun.
There are tools to help you on this. Namely Progress Listeners together with nsIWebProgressListener and some others. The browser support for this, however, is horrible. Firefox began to try to support it from FF4 onwards (still evolving), IE has basic support in IE9.

And I guess I could come up with another flawed solution soon. The fact is - there's no definite answer on when to say "now the page is complete" because of the everlasting scripts doing their work. Pick the one that serves you best, but beware of its shortcomings.
```
## VS Code configuration to debug
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "outputCapture": "std",
            "name": "Launch Program",
            "program": "${workspaceFolder}/node_modules/cucumber/bin/cucumber-js"
        }
    ]
}
```