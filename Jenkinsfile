pipeline {
    agent any

    parameters {
        string(name: 'ENVIRONMENT', defaultValue: 'development', description: 'Choose the environment: development, staging, production')
    }

    stages {
        stage('Build') {
            steps {
                echo "Building for ${params.ENVIRONMENT} environment..."
                // Add build steps here
            }
        }
        stage('Test') {
            steps {
                echo "Running tests for ${params.ENVIRONMENT} environment..."
                // Add test steps here
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying to ${params.ENVIRONMENT} environment..."
                // Add deployment steps here
            }
        }
    }
}
