export interface HighBallerItem {
    id: string;
    number: string; // e.g. "#12" or "More"
    title: string;
    author?: string;
    date: string;
    image: string;
    isMore?: boolean;
}
