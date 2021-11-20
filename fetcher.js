const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);
const path = args[1];
const url = args[0];

request(url, (err, res, body) => {
  if (fs.existsSync(path)) {
    //if the file exists
    console.log("file exists...removing");
    fs.unlinkSync(path); //remove the file
  } else {
    res.setEncoding("utf8"); //set the encoding to utf8 so that we can read the file as a string
    // if the file does not exist then write the data to the file path specified by the user
    fs.writeFile(path, body, (err) => {
      //write the data to the file path specified by the user and callback function to check for errors if any occur
      if (err) {
        console.log(err); //if there is an error, log it to the console
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`); //log the length of the body and the path to the file to the console
      }
    });
  }
});
