pipeline {
agent any

    stages{
        stage('Network'){
            steps{
                echo "Creating network"
                sh '''
                docker network create -d bridge our-net
                '''
            }
        }
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
                    docker run --network=our-net -itd --name=build_container build
                    docker run -it --network=our-net -v $PWD:/e2e -w /e2e --name=cypress_container cypress/included:12.8.1

                    docker stop build_container
                    docker stop cypress_container
                    docker network rm our-net
                '''
            }
        }

    }
}