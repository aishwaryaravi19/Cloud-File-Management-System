# Cloud-File-Management-System

Name: Aishwarya Ravi 

SJSU ID: 015900768 

Project –1 

Source Code: 

GitHub repo name: Cloud File Management System 
GitHub username: aishwaryaravi19 
GitHub URL: https://github.com/aishwaryaravi19/Cloud-File-Management-System 

Requirements: 

To Create a highly available, highly scalable, cost effective 3 tier web application which could be accessed over the public internet through the registered domain name.  

My domain name:- http://fileexplorerposts.xyz:8081/ 

Architecture Diagram: 

 
Project 1: 

User Registration 

5 points 

User registration form contain fields such as user name, email address and password. The username “admin” refers to the admin of the system and all other users are considered as non – admins. The users must be registered in order to access the application. 

 

 

Custom Login 

5 points 

If the user has already registered, they can login to the application using their login credentials. The user has to enter his/her email address and password. After login is successful, they will be taken to the Files dashboard page. 

 

Social Media Login - FB 

0 points 

Used passport framework from EJS to integrate with social media – FB. User can login through their FB login credentials. 

 

File Upload 

5 points 

In the file upload screen, the user will be able to see the uploaded files and details like file name, file URL, upload time, username and file updated at fields. 

The users will see their corresponding files. If the user is an admin, then he/she will be able to see all users’ uploaded files on their dashboard. 

 

 

 

File Download 

5 points 

Users can go through already uploaded files list with each record having a URL to download the file. 

 

 

 

Users can download these files which they uploaded by clicking on the file URL. 

Database Updates 

5 Points 

I have used Amazon DynamoDB for this project. It is a NOSQL database and it helps in performing read, write, update and delete operations at ease.  

 

 
File Edit 

5 Points 

Users can update the files already uploaded by them, they can update the file name and the file. Updated values of the files are displayed as shown below. 

Here Bubblesort.class record is updated as shown below. File URL is different. 

 
File Delete 

5 Points 

Using the delete button, users and admin can delete the files already uploaded by them. 

 

 

AWS Configurations and Usages 

R53 

5 Points 

I have purchased my domain from Godaddy as it was less expensive when compared to AWS domains. After obtaining the domain(http://fileexplorerposts.xyz), I used amazon R53 to create a host zone. Records are added with the domain name from GoDaddy and public IP of EC2. Then, I added amazon nameservers to the GoDaddy account. 

 

 

 
ELB (Elastic Load Balancer) 

5 Points 

To distribute the traffic across multiple ec2 instances, I have made use of classic load balancer to which I have assigned the security groups, made health check configurations, registered load balancers for ec2 instances. These instances are present at different availability zones. The cross-zone load balancing has been enabled for these instances. 

 

 

S3 Bucket and Cloud Front 

5 Points 

Files get uploaded to s3 bucket (Two buckets are created – primary and back up) in different AZs (US West and Asia Pacific). I have configured lifecycle policy which contains uploaded objects in Standard for first 75 days and moves it to Standard IA. Then after 365 days, moves it to Glacier and after 730 days, deletes the objects along with object markers and incomplete multipart uploads. 

 

 

 

 

 

 

 

Cloud Front 

Cloud front has been used to reduce latency & reliability as it serves from edge locations. It also enables transfer acceleration from s3 bucket. 

 

 

 
Lambda 

5 Points 

I have used AWS lambda function for file compression and replication to S3 bucket, whenever the push event to S3 bucket happens. It helps ensure less storage space and also provides backup option. 

 

 

I have written the lambda function in python to replicate and compress files to back up s3 bucket. 

 

SNS, CloudWatch 

5 Points 

SNS: 

Whenever lambda function fails to compress and replicate files to back-up s3 bucket, SNS event is triggered and email notification is sent to the user. I have configured a topic and a subscription and given my email address for the same.  

 

 

Cloud Watch: 

Cloud watch metrics are used for various purposes like knowing Memory Consumption, CPU Utilization and requests from varied time intervals. I have integrated my S3 and lambda with cloud watch which provide me real time statics  

 

 

 

 

 

 

DR Measures 

5 Points 

Disaster recovery measures could be taken by building buckets in two different geographical locations one in US West and another in Asia Pacific. By using replication function under management, we could copy data from one region to another region. 

 

 

 

 

High Availability Solution (Multi AZ Replication) 

5 Points 

To configure AWS resources or services to be highly available, I have used dynamodb (Enabled Multi AZ), s3 buckets (Main and back up buckets), EC2 instances (Enabled in different AZs) and ELB to ensure that the EC2 traffic is spread across multiple AZs. 

 

 

 
Highly Scalable (Used AutoScaling Groups) 

5 Points 

I have made use of Auto scaling groups for my EC2 instances for high scalability. Scale in and scale out rule has been used. 

 

 

 

Version Control GitHub, Codestar, CodeCommit, other 

10 Points 

I have used GitHub and Amazon Code commit for version control.( To create pull requests, code commits and version management). 

Amazon Codestar has been used for continuous Integration and Continuous Deployment. 

I have used Node JS and Express JS for backend. I have used Amazon SDK to interact with AWS. Have implemented best practices in my code to handle error scenarios and edge cases. 

Frontend has been written using EJS to communicate with the back end server 

GitHub URL : https://github.com/aishwaryaravi19/Cloud-File-Management-System 

AWS Codestar: 

 

 

 

 

 

CodeCommit: 

 

 

 

Admin Panel 

10 Points 

Admin dashboard lists all files of all users. Only admin can view all users’ files, edit them and delete them.   

Whereas, Non admin users will only see the files that they uploaded and will be able to delete only them. 

 

 

UI, Documentation, Video, AWS Resource Config 

10 Points 

Front end has been implemented using EJS and the UI could be seen by accessing the domain (http://fileexplorerposts.xyz:8081/) 

Documentation is written here and is also available in GitHub (ReadMe) 

Video has been uploaded to the GitHub and is under the folder ‘zoom’. 

 

AWS Resource Config 

 

 

 

 

 
 
