Ecommerce Vendor RestFul API's and Follow MVC Pattern ?

1:- Register vendor with File.
2:- Login with JWT Auth Token.
3:- We Create some API's in this Project.

Step:1
  I. Create folder on the basis of mvc patter 
      routes        :- to store all the routes 
      public        :- to keep assests and image file
      models        :- write bussiness login and also define the schema 
      controllers   :- to controlled all the api and defines apis
      config        :- All the configuration related to information keep here


1:- Register User with File.

2:- Login API Create.
    JWT Auth  with Login API. 

3:- Make API test 
    On the basis of token to authorize the user 

4:- Updat password API
       On the basis of user_id (_id) to update password

5:- Create Forgot Password API
    Create Reset Password API

    1. install randomstring - for 
    2. install nodemailer - for sending the mail at the time of reset password 