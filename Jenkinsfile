pipeline {
  agent any

  environment {
    REPO_NAME = "${env.JOB_NAME.split('/')[1]}"
    BUILD_IMAGE = "${REPO_NAME}-${BRANCH_NAME}-${BUILD_NUMBER}"
    BUILD_CONTAINER = "${BUILD_IMAGE}"
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build --target build -t $BUILD_IMAGE .'
      }
    }
    stage('Build compose stack') {
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
  // copy test-results out from build image
  // post {
  //   always {
  //     sh 'rm -fr build && mkdir -p build/test-results'
  //     sh 'docker create --name $BUILD_CONTAINER $BUILD_IMAGE'
  //     sh 'docker cp $BUILD_CONTAINER:/app/build/test-results build/ && touch build/test-results/*.xml'
  //     sh 'docker rm $BUILD_CONTAINER'
  //     junit 'build/test-results/**/*.xml'
  //   }
  // }
}