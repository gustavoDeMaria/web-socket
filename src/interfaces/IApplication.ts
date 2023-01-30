import { Express } from "express";

export default interface IApplication
{
    Express : Express;

    StartAsync() : Promise<void>;    

    Configure(): void;
}