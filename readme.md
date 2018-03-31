Use git to promote changes

aws cloudformation package --template template.yml --s3-bucket api-cloudformation-packages --output-template output--template.json

aws cloudformation deploy --template-file /Users/roberto/proyectos/rodco/aws/notificationServices/output--template.json --stack-name service-notification-production

# ion-home-lambda
