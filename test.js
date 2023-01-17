var request = require('request');

var dataString = 'From=09513886363&To=7224811232&Body=This is a test message powered by Exotel. Report abuse to +918088919888 -Exotel';

var options = {
    uri: 'https://148a1a431bc0f16bde23b834f91723cefab15e8e8c8318a2:7ffdc3df16bbccbbd06435571d374b311f05028e91d43a29api.exotel.com/v1/Accounts/aayusharora1/Sms/send',
    method: 'POST',
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
    console.log(response)
    console.log(body)
}
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ console.log(httpResponse.body) })
request(options, callback);
            