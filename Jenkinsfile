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
                    docker run --network=host -itd --name=build_container build
                    docker run --network=host -v $PWD:/e2e --name=cypress_container cypress/included:12.8.1

                    docker stop build_container
                    docker stop cypress_container
                '''
            }
        }
    }
}
