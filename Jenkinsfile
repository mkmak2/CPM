pipeline {
agent any

    stages{
        stage('Build'){
            steps{
                echo "Build stage"
                sh '''
                    docker build -t build -f ./Dockerfile.build .
                '''
            }
        }
        stage('Test'){
            steps{
                echo "Test stage"
                sh '''
                    docker run -itd --name=build_container build
                    docker run -it -v $PWD:/e2e -w /e2e cypress/included:12.8.1

                    docker stop build_container
                    docker stop cypress_container
                '''
            }
        }
    }
}
