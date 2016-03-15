export interface Goal {
    ID?: string;
    name: string;
    color: string;
    children?: Array<Goal>

}