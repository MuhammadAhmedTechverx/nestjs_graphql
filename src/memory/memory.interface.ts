export interface MemoryDetail {
  title: string;
  description: string;
  images: [string];
  tags:[string]
  userId: string;
}

export interface MemoryLike {
  userId: string;
  memoryId: string;
  flag: boolean;
}

export interface MemoryComment {
  userId: string;
  memoryId: string;
  comment: [string];
}

