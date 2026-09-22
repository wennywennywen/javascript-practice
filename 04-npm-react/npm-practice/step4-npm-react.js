//check the package.json while reading this 
// npm init -y : write -y meaning create the file and read nothing
// this -y become useful for later commands 
// for example npm test would read the  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1"}
// the common ones are 
//npm init -y          once, at the start          → creates the file
//npm install X        whenever you need a library → records things you installed into this package file under the dependencies + downloads it
//npm install          when you clone a project    → downloads everything recorded
//npm run dev          every day                   → runs your saved command
//npm is two things:
//A huge public library of other people's code — millions of packages on a server.
//A command-line tool that downloads from it and runs your saved commands.

//after npm install dayjs 
//- **`package.json`** has a new `"dependencies"` section listing `dayjs`
//- **`package-lock.json`** appeared — the exact versions of everything, so the install is  reproducible on another machine
//- **`node_modules/`** appeared — the actual code, with lots of folder so no need to commit this to github

//N3 Import
import dayjs from "dayjs";
console.log(dayjs().format("YYYY-MM-DD"));

//N4 Scripts
//Add to `package.json`:

//```json
//"scripts": {
//  "start": "node index.js"
//}```
//Then `npm start`.
//npm start read scripts.start from package.json, ran node index.js, and node index.js then form the dayjs formatted today's date.
//so instead of node index.js in terminal can just write the npm start
