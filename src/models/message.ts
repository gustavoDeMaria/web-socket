export interface Message {
    content: string;
    type: "text" | "png"
    to: string[];  
    from: string;
}