pipeline {
       agent any
       environment {
           // Define environment variables here
           NODE_ENV = 'development' // Change to 'production' for production builds
       }
       stages {
           stage('Build') {
               steps {
                   echo 'Building...'
                   // Add build steps here if needed
                   script {
                       try {
                           // Example build command
                           sh 'npm install' // For JavaScript dependencies
                       } catch (Exception e) {
                           error "Build failed: ${e.message}"
                       }
                   }
               }
           }
           stage('Test') {
               steps {
                   echo 'Testing...'
                   // Add test steps here if needed
                   script {
                       try {
                           // Example test command
                           sh 'pytest' // For Python tests
                       } catch (Exception e) {
                           error "Tests failed: ${e.message}"
                       }
                   }
               }
           }
           stage('Deploy') {
               steps {
                   echo 'Deploying...'
                   // Add deployment steps here if needed
                   script {
                       try {
                           // Example deployment command
                           sh 'docker build -t myapp .'
                           sh 'docker run -d -p 80:80 myapp'
                       } catch (Exception e) {
                           error "Deployment failed: ${e.message}"
                       }
                   }
               }
           }
       }
   }
