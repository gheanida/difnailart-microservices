// src/users/events/user-created.event.ts
export class UserCreatedEvent {
    event: string;
    data: {
      id: number;
      email: string;
      name: string;
      role: string;
      createdAt: Date;
    };
    timestamp: string;
  }