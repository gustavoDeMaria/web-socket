import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


export class SocketIO extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
{
}
