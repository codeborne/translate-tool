pipeline {
  agent any

  environment {
    REPO_NAME = "${env.JOB_NAME.split('/')[1]}"
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker-compose -p $REPO_NAME build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose -p $REPO_NAME up -d --remove-orphans'
      }
    }
  }
}
