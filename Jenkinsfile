pipeline {
    agent { label 'slave1'}
    options {
        ansiColor('xterm')
    }
        stages {
            stage ('Build application') {
                steps {
                    sh 'npm install'
                    sh 'source ~/.bashrc && nvm use 10.16.0 && npm rebuild node-sass && node_modules/.bin/ng build --prod --optimization --build-optimizer --aot --extract-licenses=true --extract-css=true --source-map=false --vendor-chunk=false -c ci'

                }
            }

            stage ('Create docker image') {
                steps {
                    sh '$(aws ecr get-login --no-include-email --region us-west-2)'
                    sh '''
                    TAG=$(git rev-parse --short HEAD)
                    TAG="web.admin.operaciones.$TAG-$BUILD_NUMBER"
                    docker build -t $ECR_URL/web-admin-operaciones:$TAG -f devops/Dockerfile .
                    docker push $ECR_URL/web-admin-operaciones:$TAG
                    '''
                }

            }
        }
}
