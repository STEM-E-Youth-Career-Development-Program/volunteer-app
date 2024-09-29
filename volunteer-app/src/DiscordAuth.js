export default class Oauth{
    constructor() {
        this.client_id = "530423010621128704";
        this.client_secret = "client secret";
        this.scope = "";
        this.redirect_url = "/home";
        this.discord_login_url = `https://discordapp.com/api/oauth2/authorize?client_id=${this.client_id}&redirect_url=${this.redirect_url}&response_type=code&scope=${this.scope}`;
    }
}