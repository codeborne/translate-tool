pipeline {
  agent any

  environment {
    REPO_NAME = "${env.JOB_NAME.split('/')[1]}"
    GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = credentials('GOOGLE_CLIENT_SECRET')
    COOKIE_SECRET = credentials('COOKIE_SECRET')
    PROJECT_GITHUB = credentials('PROJECT_GITHUB')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build --target build -t ${REPO_NAME}_build .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run ${REPO_NAME}_build npm test'
      }
    }
    stage('E2E Test') {
      steps {
        sh 'docker build --target e2e -t ${REPO_NAME}_e2e .'
        sh 'docker run -e PROJECT_GITHUB ${REPO_NAME}_e2e e2e/run.sh'
      }
    }
    stage('Build final') {
      steps {
        sh 'docker-compose -p $REPO_NAME build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose -f docker-compose.yml -p $REPO_NAME up -d --remove-orphans'
      }
    }
  }
}
