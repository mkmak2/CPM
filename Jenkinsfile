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
                    docker run --network=our-net -itd -p 3000:3000 --name=build_container build
                    docker run --network=our-net -v $PWD:/e2e -w /e2e -p 5000:5000 --name=cypress_container cypress/included:12.8.1

                    docker stop build_container
                    docker stop cypress_container
                '''
            }
        }
    }post{
        always{
            sh '''
            docker network rm our-net
            '''
        }
    }
}
