When the project is cloned into the local system, run the following commands in the main directory
> npm install

Now get into the clients directory and repeate the same step
> cd clients
>npm install

Now get into kafkabackend and perform the same step.
> cd ..
> cd kafka-back-end
>npm install

The application is now ready to run. The package.json has facility to start all the files together with just one command.
> npm run dev

This will start the backend, frontend, run the kafka script and start the kafka-back-end simultaneously.
The server is running on the port 3000 and the client is running on the port 8080. The dropbox application should be automattically opened if the installations are successful.




Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
