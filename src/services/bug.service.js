const fs = require('fs')


const gBugs = require('../../day44-missBug/data/bug.json')


function query() {
    return Promise.resolve(gBugs);
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    gBugs.splice(idx, 1)
    return _savebugsToFile()
}

// function done(bugId){
//     const idx = gBugs.findIndex(bug => bug._id === bugId)
//     gBugs[idx].isDone=!gBugs[idx].isDone
//     return  _savebugsToFile()
 
// }

function save(bug) {
    if (bug._id) {
        const idx = gBugs.findIndex(currTodo => currTodo._id === bug._id)
        gBugs[idx] = bug;
    } else {
        bug._id = _makeId()
        gBugs.push(bug)
    }
    return _savebugsToFile()
        .then(() => {
            return bug;
        })
}


module.exports = {
    query,
    getById,
    remove,
    save,
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _savebugsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}
