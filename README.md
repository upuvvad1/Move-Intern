# Move-Intern
This project involves 2 applications.
a) Server
b) Client

Server, is a nodejs server side App,that listens on localhost at port 4000, and listens for requests.
Once the request is recieved it is processed and sent back the response.
For now, only 1 request with /getrate parameter has been implemented, which reads data from http://webrates.truefx.com/rates/connect.html?f=csv
and responds as JSON array objects.
All other requests were responded back with 500 status code.

Client, is a reactJS client APP, which requests the server for every 20 seconds to fetch with new currency feed.
