#!/bin/bash

mongosh <<EOF
var config = {
    "_id": "am-store-mongo-set",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodbPrimary:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongodbSecondary1:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongodbSecondary2:27017",
            "priority": 1
        }
    ]
};

rs.initiate(config, { force: true });

function isItReadyMember(member) {
    if (member.name === "mongodbPrimary:27017") {
        return member.state === 1
    } else {
        return member.state === 2
    }
}

function checkMembersStatus(members) {
    return members.every(isItReadyMember)
}

async function checkReplicaSetReadiness() {
    return new Promise((resolve) => {
        console.log("Wait the database to be ready...")
        setInterval(() => {
            if (checkMembersStatus(rs.status().members)) {
                resolve("The database is ready to recieve queries") 
            }
        }, 1000)
    })
}

checkReplicaSetReadiness().then((result) => { console.log(result) });