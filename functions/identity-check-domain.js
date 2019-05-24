exports.handler = function(event, context, callback) {
    /*
     * Credit https://github.com/kennedyrose
     * Source: https://github.com/escaladesports/react-netlify-form/blob/master/src/functions/identity-signup.js
     */

    // your server-side functionality
    const { user } = JSON.parse(event.body)
    const { email } = user

    console.log(`${email} signing up`)
    const domain = email.split(`@`)[1]
    let res = ``
    let statusCode = 400
    
    domainWhitelist = [`netlify.com`,]

    if(domainWhitelist.indexOf(domain) !== -1){
        console.log(`Whitelisting`)
        statusCode = 200
        res = JSON.stringify({
            app_metadata: {
                roles: [`loggedinuser`],
            },
        })
    } else {
        console.log(`Blocking`)
    }
    
    callback(null, {
        statusCode,
        body: res,
    })
}