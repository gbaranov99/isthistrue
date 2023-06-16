const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

// TODO: create seperate environments/api keys for development vs production
// const targetPath = isProduction
//    ? `./src/environments/environment.prod.ts`
//    : `./src/environments/environment.ts`;

const targetPath = './src/environments/environment.prod.ts';

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   OPENAI_API_KEY: "${process.env["OPENAI_API_KEY"]}"
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err:any) {
   if (err) {
      console.log(err);
   }

   console.log(`Wrote variables to ${targetPath}`);
});
