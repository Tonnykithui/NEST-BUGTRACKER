export enum Levels {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export enum TicketStatus {
    Open = 'open',
    Inprogress = 'inprogress',
    Closed = 'closed'
}

export class CreateTicketDto {
    Title:string;
    Description:string;	 
    Status:TicketStatus[];	 
    Priority:Levels[];	 
    DateRaised:Date;	 
    CloseDate:Date;	 
    Severity:Levels[];
    OwnerId:string;
    ProjectId:string;
}
