pipeline {
  environment {
    registry = "chiamakaobitube/node-jenkins"
    registryCredential = 'dockerhub'
  }
  agent any
  tools {nodejs "NodeJS"}

  stages { 
    stage('Git') {
      steps {
        git 'https://github.com/ChiamakaObitube/AutoMart.git'
      }
    }
  
    stage('Build') {
       steps {
         sh '''
         npm install
         npm run build
         '''
       }
    }
    /*stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
    */
  }
}