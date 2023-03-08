import * as signalR from '@microsoft/signalr'
let connection: any = null
connection = new signalR.HubConnectionBuilder()
    .withUrl("https://gis-auth.digsur.com/chathub")
    .withAutomaticReconnect()
    .build();

export default connection