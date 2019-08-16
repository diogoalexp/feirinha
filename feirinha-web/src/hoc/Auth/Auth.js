import React from 'react';

class Auth {
    static getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static status = () => {
        return this.getCookie("token") > 0;
    };

    static value = () => {
        return this.getCookie("token");
    };

    static user = () => {
        return this.getCookie("token") > 0 ? {id: this.getCookie("token")} : null ;
    };
}


export default Auth;