'use strict';

const express = require('express');
const cors = require('cors');
const child_process = require('child_process');

const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:3000'];


const execTidy = async (cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_review_tfidf.R';
  const R_Parameters = 'ChIJldrqooqpQjQRl4bCVhVRvuI';
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-tidy throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-tidy success result');
    return cb(null, stdout)
  })
}

run().catch((err) => console.log(err));

async function run() {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  )
  
  // app.get('/api', async function(req, res) {
  //   console.log("Got /events");
  //   let input = req.query.input;
  //   console.log(`Got input: ${input}`);
  //   res.set({
  //     'Cache-Control': 'no-cache',
  //     'Content-Type': 'text/event-stream',
  //     Connection: 'keep-alive',
  //   });
  //   res.flushHeaders();

  //   // Tell the client to retry every 10 seconds if connectivity is lost
  //   res.write('retry: 10000\n\n');

  //   res.write(`data: {"status" : "server_get_msg"}\n\n`);
  //   res.write(`data: {"return" : "hello ${input}"}\n\n`)
  // })

  app.get('/ex-tidy', async function(req, res) {
    await execTidy(function(error, result) {
      if (error) {
        return res.send(error);
      }
      return res.send(result)
    })
  })

  await app.listen(PORT, () => {
    console.log('Listening on port 4000');
  });
}

