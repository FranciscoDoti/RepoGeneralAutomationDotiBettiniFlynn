node ./node_modules/cucumber/bin/cucumber-js -f rerun --format rerun:@rerun1.txt --tags '@Gradebook' ;


#node ./node_modules/cucumber/bin/cucumber-js @rerun1.txt -f rerun --format rerun:@rerun2.txt ;

node ./node_modules/cucumber/bin/cucumber-js @rerun1.txt -f json:reports/cucumber_report.json ;

rm @rerun*
