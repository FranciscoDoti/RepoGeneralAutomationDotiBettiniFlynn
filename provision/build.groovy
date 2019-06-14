import jenkins.model.*;
import groovy.json.*;
import hudson.*;

def git_repo = "cucumber-framework"
def artifact_name = "./artifacts/*"
def artifactory_server = Artifactory.server 'Macmillan-Artifactory'
def artifactory_target

pipeline {
  agent any
  stages {
    stage ('build and publish containers') {
      steps {
        script {
          def scmVars = checkout scm
          def tag = sh(returnStdout: true, script: "git tag --contains").trim()
          if ("${tag}" == "null" || "${tag}" == "") {
            tag = scmVars.GIT_BRANCH.replaceFirst(/^.*\//, "")
          }
          artifactory_target = "Macmillan-Product-Builds/${git_repo}/${tag}/"

          def downloadSpec = """{
                        "files": [
                            {
                                "pattern": "${artifactory_target}sha",
                                "target": "./"
                            }
                        ]
                    }"""
          def dl = artifactory_server.download(downloadSpec)

          def existingSHA = ""
          if (fileExists("${env.WORKSPACE}/${git_repo}/${tag}/sha".toString())) {
            existingSHA = readFile file: "${env.WORKSPACE}/${git_repo}/${tag}/sha".toString()
          }

          if ( existingSHA != scmVars.GIT_COMMIT ) {

            echo "building cucumber-framework containers ${env.BUILD_ID} with tag ${tag}"

            withCredentials([
              usernamePassword(credentialsId: 'artifactory-jenkins-user', usernameVariable: 'NPM_USER', passwordVariable: 'NPM_PASSWORD')
            ]) {
              sh './provision/build_npmrc.sh'
            }

            def saImage
            def saMigrationImage

            sh '''
              export SHORT_COMMIT=$(git rev-parse --short HEAD)
              echo "$SHORT_COMMIT"  > shortcommit
              export RELEASE_VERSION=$(git describe --abbrev=0)
              echo "$RELEASE_VERSION" > releaseversion
            '''

            writeFile file: "${env.WORKSPACE}/artifacts/sha".toString(), text: "${scmVars.GIT_COMMIT}".toString()

            docker.withRegistry('https://docker-dev.registry.sh.mml.cloud', 'artifactory-jenkins-user') {
              saImage = docker.build("cucumber-framework:${scmVars.GIT_COMMIT}")
              saImage.push(tag)
            }

            echo "published containers with tag:${tag}  for cucumber-framework to artifactory"

          } else {

            echo "build skipped with tag:${tag}  for cucumber-framework already exist"

          }
        }
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}
