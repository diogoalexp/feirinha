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
        return this.getCookie("token") != "" && this.getCookie("token") > 0;
    };

    static value = () => {
        return this.getCookie("token");
    };

    static user = () => {
        return this.getCookie("token") > 0 ? {id: this.getCookie("token"), login: this.getCookie("login")} : null ;
    };
}


export default Auth;