pipeline{
    agent any
    
    stages {
      stage('Build') {
        steps {
          nodejs(nodeJSInstallationName: '16.11.1') {
            sh 'npm run build'
          }
        }
      }
      stage('Test'){
        steps {
          nodejs(nodeJSInstallationName: '16.11.1') {
            sh 'npm run test'
          }
      }
    }
  }
}
