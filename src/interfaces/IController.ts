import {Request, Response} from 'express'

export default interface IController
{
    Request : Request;
    Response : Response;
}
