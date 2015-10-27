/**
 * Created by 204071207 on 9/22/15.
 */

"use strict";

function generateDocId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
};

function sleep(dur) {
    var d = new Date().getTime() + dur;
    while(new Date().getTime() <= d ) {
        //Do nothing
    }

};

var e = module.exports;
e.generateDocId = generateDocId;
e.sleep = sleep;

