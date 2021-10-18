pipeline{
    agent {label 'A1'}
    
    stages {
      stage('Build') {
        steps {
          nodejs(nodeJSInstallationName: '16.11.1') {
            sh 'npm ci'
            sh 'npm run build'
          }
        }
      }
  }
}
