import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    saveEmail,
    deleteEmail,
    getEmailById,
    getNextemailId,
    getStarList,
    getSentEmails
}
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
const KEY = 'emails';
const gEmails = [{
    id: 1,
    name: 'Itay',
    emailAddress: 'itay@gmail.com',
    subject: 'Normally i stay up late',
    body: `Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer.
         Text messages may be sent over a cellular network, or may also be sent via an Internet connection.`,
    isRead: false,
    star: false,
    sentAt: new Date(),
    to: 'momoi@momo.com'
},
{
    id: 2,
    name: 'Itay',
    emailAddress: 'itay@walla.com',
    subject: 'Normally i stay up late',
    body: `electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer.
    Text messages may be sent over a cellular network, or may also be sent via an Internet connection.`,
    isRead: false,
    star: false,
    sentAt: new Date(),
    to: 'momo@momo.com'
},
{
    id: 3,
    name: 'Itay',
    emailAddress: 'itay@walla.com',
    subject: 'Normally i stay up late',
    body: `electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer.
    Text messages may be sent over a cellular network, or may also be sent via an Internet connection.`,
    isRead: false,
    star: false,
    sentAt: new Date(),
    to: 'momo@momo.com'
}
];
const SentMails = []

// _createEmails();

function query(filterBy) {
    console.log('im here');
    if (filterBy) {
        let { name, emailAddress } = filterBy
        console.log('query filterBy', name)
        console.log('query filterBy', emailAddress)

        const emailsToShow = gEmails.filter(email => {
            console.log('email.name', email.name)
            return email.name.toUpperCase().includes(name.toUpperCase()) &&
                email.emailAddress.toUpperCase().includes(emailAddress.toUpperCase())
        })
        return Promise.resolve(emailsToShow)
    }

    return Promise.resolve(gEmails)
}

function getSentEmails() {
    return SentMails
}
function getStarList() {
    console.log('we are here');
    const emailsStarred = gEmails.filter((email) => {
        console.log(email.star);
        return email.star
    })
    return emailsStarred
}


function deleteEmail(emailId) {
    var emailIdx = gEmails.findIndex(function (email) {
        return emailId === email.id
    })
    gEmails.splice(emailIdx, 1)
    _saveEmailToStorage();
    return Promise.resolve()
}

function saveEmail(emailToEdit) {
    return emailToEdit.id ? _updateEmail(emailToEdit) : _addEmail(emailToEdit)

}


function _addEmail(emailToEdit) {
    const { name, emailaddress, subject, body, to } = emailToEdit
    var email = _createEmail(name, emailaddress, subject, body, to)
    SentMails.unshift(email)
    gEmails.unshift(email)
    _saveEmailToStorage();
    return Promise.resolve()
}

function _updateEmail(emailToEdit) {
    var emailIdx = gEmails.findIndex(function (email) {
        return email.id === emailToEdit.id;
    })
    gEmails[emailIdx] = emailToEdit
    _saveEmailToStorage();
    return Promise.resolve()
}


function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}


function getNextemailId(emailId) {
    const emailIdx = gEmails.findIndex(email => email.id === emailId)
    let nextemailIdx = emailIdx + 1
    if (nextemailIdx === gEmails.length) nextemailIdx = 0
    return gEmails[nextemailIdx].id
}

function _createEmail(name, emailAddress, subject, body, to) {
    return {
        id: utilService.makeId(),
        name,
        emailAddress,
        subject,
        body,
        isRead: false,
        star: false,
        sentAt: new Date(),
        to
    }
}

function _createEmails() {
    var emails = storageService.loadFromStorage(KEY)
    gEmails = emails;
    _saveEmailToStorage();
}

function _saveEmailToStorage() {
    storageService.saveToStorage(KEY, gEmails)
}
