const fs = require('fs');
const {google} = require('googleapis');
const path = require('path')

const service = path.join(__dirname, '../public/service/');
const data = path.join(__dirname, '../public/data/')


const getCredentials = function () {
    let auth, creds, token;
    creds = fs.readFileSync(service + 'credentials.json');
    creds = JSON.parse(creds);
    const {client_secret, client_id, redirect_uris} = creds.web;
    auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    token = fs.readFileSync(service + 'token.json')
    auth.setCredentials(JSON.parse(token));
    return auth
}


const getMessagesText = function (messagesArray) {
    messagesArray.forEach((id) => {
        messages.get({
            userId: 'me',
            id: id,
            format: 'full',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const messageDate = res.data.internalDate.substr(0, 10);
            const messageText = res.data.payload.parts.find((part) => part.mimeType === 'text/html').body.data;
            parseMessage(messageText, messageDate)
        })
    })
}

const getMessageHistory = function (date) {
    messages.list({
        userId: 'me',
        labelIds: ['Label_1421478860309557188']
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        res.data.messages.reverse();
        const messagesArray = res.data.messages.map((obj) => obj.id)
        getMessagesText(messagesArray)
    })
}

const parseMessage = function (text, date) {
    //const decodedText = Buffer.from(text, "base64").toString('utf-8')
    const regex = /(Лекция)[ \n]+по[ \n]+дисциплине[ \n]+([^,]*),[ \n]+преподаватель[ \n]+([А-я]*[ \n]+[А-я].[А-я].),[ \n]+состоится[ \n]+([0-9]*.[0-9]*.[0-9]*[ \n]+)([0-9]*:[0-9]*)[А-я.,A-z<>\/\- \n]*='(https:\/\/itmo.zoom.us\/j\/[0-9?A-z=]*)'/gm;
    //TODO Доделать ебаный парсер, ебал рот чтения файла. Сделать строку в ``
    let decodedText = `` + fs.readFileSync(data + 'text.txt', 'utf-8')
    fs.writeFileSync(data + 'text2.txt', decodedText)
    const formattedText = decodedText.matchAll(regex)
    fs.writeFileSync(data + 'formattedText.json', JSON.stringify(Array.from(formattedText)))
}

//(Лекция)[ \n]+по[ \n]+дисциплине[ \n]+([^,]*),[ \n]+преподаватель[ \n]+([А-я]*[ \n]+[А-я].[А-я].),[ \n]+состоится[ \n]+([0-9]*.[0-9]*.[0-9]*[ \n]+)([0-9]*:[0-9]*)[А-я.,A-z<>/\- \n]*='(https:\/\/itmo.zoom.us\/j\/[0-9?A-z=]*)'
const auth = getCredentials();
const messages = google.gmail({version: 'v1', auth}).users.messages;

module.exports = {
    getCredentials,
    getMessagesText,
    getMessageHistory,
    parseMessage
}