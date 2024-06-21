Vehicle Doc 360 is a web application designed to revolutionize vehicle entry management at factories. It eliminates the need of manual record keeping by gate personnel, replacing it with a swift and efficient QR Code base system. 

Vehicle Details Management:-
Step 1:- First the factory admin have to login himself in the portal by using username and password.
Step 2:- Then we send an otp to that admin email id by using mailersend SMTP server. Admin have to input that otp to login within 5 minutes because after 5 minutes that otp will expire.
Step 3:- After Login admin will be redirected to dashboard and have multiple operations to perform like add vehicle, update vehicle and can also see how many vehicles are already registered to the portal.
Step 4:- To register a new vehicle admin have to go to Add Vehicle option and a html form will appear. In that form the admin have to input details like vehicle owner name, vehicle owner phone no, vehicle no, engine no, brand, vehicle registered state, driver name, driver phone no, driver license no, chasis no, vehicle registered upto, tax paid upto, insurance paid upto, pollution certificate valid upto, vehicle fitness certificate valid upto and vehicle permit valid upto. And then that vehicle data will be stored to the database.
Step 5:- After that a QR code will automatically generate for that particular vehicle which contains all the details of that vehicle. And the admin will give that qr code to the vehicle owner or the driver.

Scanning the QR Code:-
Step 1:- When the truck will arrive at the factory the driver will show that qr code which was given by the admin to the gateman.
Step 2:- The gateman then scan that qr code and fetched the data from that qr code.
Step 3:- Then that data will be sent for verification and if the data verified successfully it will show verified and that truck will be granted access. If not then the driver or the vehicle owner have to be update the details in the portal by the help of admin or retry again with valid details.
Step 4:- After verification that vehicle no, owner name, driver license no and the time of entry will be stored successfully and will be displayed to the admin dashboard.
