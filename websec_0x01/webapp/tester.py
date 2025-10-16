
'''
from boto3 import client, Session
from json import dumps
from os import system

system('clear')

S = Session(profile_name='hbtn')
c = S.client('ecs')


print('Cluster', dumps(
    c.list_clusters(),
    indent=4))

print(dumps(
    c.list_task_definitions(),
    indent=4))

print(dumps(
    c.list_tasks(cluster='cluster-sandbox-1', launchType='FARGATE'),
    indent=4))

print(dumps(
    c.describe_tasks(cluster='cluster-sandbox-1', tasks=['83ebdb6d461d4295a35165f1c6795d96']),
    indent=4, default=str))

print(dumps(c.stop_task(
        cluster='cluster-sandbox-1',
        task='83ebdb6d461d4295a35165f1c6795d96'), indent=4, default=str))

print(dumps(
    c.list_task_definitions(),
    indent=4))
print(dumps(
    c.describe_task_definition(
        taskDefinition='arn:aws:ecs:eu-west-3:718193331199:task-definition/cyber_websec_0x00:5'),
    indent=4, default=str    
))
'''