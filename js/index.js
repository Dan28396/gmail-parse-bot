const fs = require('fs');
const {google} = require('googleapis');
const path = require('path')

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const service = path.join(__dirname, '../public/service/');
const data = path.join(__dirname, '../public/data/')

const getAuthorized = function (callback) {
    let auth;
    new Promise(((resolve, reject) => {
        fs.readFile(service + 'credentials.json', (err, content) => {
            if (err) {
                reject(err)
                return console.log('Error loading client secret file: ', err);
            }
            const credentials = JSON.parse(content);
            const {client_secret, client_id, redirect_uris} = credentials.web;
            auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
            resolve();
        });
    })).then(() => {
        new Promise(((resolve, reject) => {
            fs.readFile(service + 'token.json', (err, token) => {
                if (err) {
                    reject(err)
                    return console.log('Error loading token file: ', err);
                }
                auth.setCredentials(JSON.parse(token));
                resolve()
            });
        })).then(() => {
            callback(auth)
        })
    })
}

const startWatching = function (auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.watch({
        userId: 'me',
        labelIds: ['Label_1421478860309557188'],
        labelFilterAction: 'INCLUDE',
        topicName: 'projects/gmail-parse-disc-1602355370857/topics/listUpdate'
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

        let currentArray;
        new Promise(((resolve, reject) => {
            fs.readFile(data + 'watch-info.json', ((error, content) => {
                if (err) {
                    reject(err);
                    return console.log('Error: ', error);
                }
                currentArray = JSON.parse(content)
                resolve()
            }));
        })).then(() => {
            let infoTemplate = {
                date: new Date(),
                isUsed: false,
                historyId: res.data.historyId,
            };
            currentArray.push(infoTemplate)
            fs.writeFile(data + 'watch-info.json', JSON.stringify(currentArray), (err) => {
                if (err) return console.error(err);
            });
        })
    });
}

module.exports = {getAuthorized, startWatching}