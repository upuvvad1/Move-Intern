This project is aimed at to gain basic understanding of reactJS.

This project has the following dependencies.

React, Reactdom, ReactScripts,Axios

From the terminal.

Setup:

	npm install react react-dom react-scripts axios

Run:

	npm start


Note: This reactJS application must be started after running the server.
      And the data loads for every 20 seconds.
      In order to change the time interval, edit the src/App.js file 

code
	 this.timerID = setInterval(() => this.fetchData(), 20000);
to
	 this.timerID = setInterval(() => this.fetchData(), N- Milli seconds);
	 

