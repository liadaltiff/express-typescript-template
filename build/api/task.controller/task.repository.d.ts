import { Request, Response, NextFunction } from 'express';
export declare const getAllTasks: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const getAllTasksThatAskedForExchange: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const getAllTasksBySoldierId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const getOneTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const askForExchange: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const deleteTaskById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const createOneTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export declare const editTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
//# sourceMappingURL=task.repository.d.ts.map