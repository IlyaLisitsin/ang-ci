# Ang-CI

## Install the dependencies
Run `npm i` to install the dependencies


## Run the dev server
Run `npm run start` for a dev server. Navigate to `http://localhost:4500/`. The app will automatically reload if you change any of the source files.

## Workflow
Navigate the [the project link](https://github.com/IlyaLisitsin/ang-ci/projects/1).  
Here tou can find the "To do" column with cards. Every card contains task description and details. If you start work with current task - drag the card to "In progress" column.  
Every task should be done in a new branch. When you finish the task - create the Pull Request using Git interface.  
After merging you branch to master the CI tool will start the building process. If build is succeed - your changes will deployed [on git pages](https://ilyalisitsin.github.io/ang-ci/)  

## Precommit
We use the Precommit. It means that if any test will fail or any file will fail linting? the commit attempt will also fail. 
You can check the stacktrace to check what is wrong, but manual check is recommended.

Run `ng test` to run tests  
Run `npm run lint` to run linter

